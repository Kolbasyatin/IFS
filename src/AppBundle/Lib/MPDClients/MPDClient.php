<?php


namespace AppBundle\Lib\MPDClients;

use AppBundle\Lib\Exceptions\CommandFactoryException;
use AppBundle\Lib\Exceptions\MPDClientException;
use AppBundle\Lib\Exceptions\MPDConnectionException;
use AppBundle\Lib\MPDClients\Commands\CommandFactory;
use AppBundle\Lib\MPDClients\Commands\CommandInterface;


/**
 * Class MPDClient
 * @package AppBundle\Lib\MPDClients
 *
 * @method array clearError()
 * @method array currentSong()
 * @method array idle()
 * @method array status()
 * @method array stats()
 * @method array consume()
 * @method array crossFade()
 * @method array mixrampdb()
 * @method array random()
 * @method array repeat()
 * @method array setVol()
 * @method array single()
 * @method array replayGainMode()
 * @method array replayGainStatus()
 * @method array next()
 * @method array pause()
 * @method array play()
 * @method array playId()
 * @method array previous()
 * @method array seek()
 * @method array seekId()
 * @method array seekcur()
 * @method array stop()
 * @method array add()
 * @method array addId()
 * @method array clear()
 * @method array delete()
 * @method array deleteId()
 * @method array move()
 * @method array moveId()
 * @method array playLists()
 * @method array playListFind()
 * @method array playListId()
 * @method array playListInfo()
 * @method array playListSearch()
 * @method array plChanges()
 * @method array plChangePosId()
 * @method array prio()
 * @method array prioId()
 * @method array rangeId()
 * @method array shuffle()
 * @method array swap()
 * @method array swapId()
 * @method array addTagId()
 * @method array clearTagId()
 * @method array listPlayList()
 * @method array listPlayListInfo()
 * @method array listPlayLists()
 * @method array load()
 * @method array playListAdd(string $name, string $uri)
 * @method array playListClear(string $name)
 * @method array playListDelete(string $name)
 * @method array playListMove(string $name, int $from, int $to)
 * @method array rename(string $name, string $newName)
 * @method array rm(string $name)
 * @method array save(string $name)
 * @method array albumart()
 * @method array count()
 * @method array find()
 * @method array findAdd()
 * @method array list()
 * @method array listAll()
 * @method array listAllInfo()
 * @method array listFiles()
 * @method array lsInfo()
 * @method array readComments()
 * @method array search()
 * @method array searchAdd()
 * @method array searchAddPl()
 * @method array update()
 * @method array rescan()
 * @method array mount()
 * @method array unmount()
 * @method array listMounts()
 * @method array listNeighbors()
 * @method array close()
 * @method array kill()
 * @method array ping()
 * @method array tagTypes()
 * @method array tagTypesDisable()
 * @method array tagTypesEnable()
 * @method array tagTypesCLear()
 * @method array tagTypesAll()
 * @method array partition(string $name)
 * @method array listPartitions()
 * @method array newPartition(string $name)
 * @method array disableOutput(int $id)
 * @method array enableOutput(int $id)
 * @method array toggleOutput(int $id)
 * @method array outputs()
 * @method array outputSet(int $id, string $name, int $value)
 * @method array config()
 * @method array commands()
 * @method array notCommands()
 * @method array urlHandlers()
 * @method array decoders()
 * @method array subscribe(string $name)
 * @method array unsubscribe(string $name)
 * @method array channels()
 * @method array readMessages()
 * @method array sendMessage(string $channel, string $test)
 */
class MPDClient
{
    /** @var string */
    private $password;

    /** @var ConnectionInterface */
    private $connection;

    /**
     * MPDClient constructor.
     * @param string $host
     * @param int $port
     * @param string $password
     */
    public function __construct(string $host, int $port, string $password)
    {
        $this->connection = new Connection($host, $port);
        $this->password = $password;
    }

    /** @throws MPDClientException */
    private function execute(CommandInterface $command): array
    {
        $this->sendPassword();
        $cmd = $command->getCommand();
        try {
            $answer = $this->connection->send($cmd);
        } catch (MPDConnectionException $e) {
            throw new MPDClientException('Connection problem. ' . $e->getMessage());
        }

        if ($this->isError($answer)) {
            throw new MPDClientException("Error! " . $answer);
        }
        $parser = $command->getParser();
        $result = $parser->parse($answer);

        return $result;
    }


    /**
     * @param string $name
     * @param $arguments
     * @return array
     * @throws MPDClientException
     */
    public function __call(string $name, $arguments)
    {
        try {
            $command = CommandFactory::createCommand($name, $arguments);
            return $this->execute($command);
        } catch (CommandFactoryException $e) {
            throw new MPDClientException($e->getMessage());
        }

    }


    /**
     * @throws MPDClientException
     */
    private function sendPassword(): void
    {
        if ($this->password) {
            $cmd = sprintf("password \"%s\" \n", $this->password);
            $answer = $this->connection->send($cmd);
            if ($this->isError($answer)) {
                throw new MPDClientException("Password is wrong!");
            }
        }

    }


    /**
     * @throws MPDClientException
     */
    public function __destruct()
    {
        try {
            $this->connection->close();
        } catch (\Exception $e) {
            throw new MPDClientException("Problem with close connection");
        }
    }

    /**
     * @param string $data
     * @return bool
     */
    private function isError(string $data): bool
    {
        $error = (bool) preg_match('/^ACK\s+\[(.*)\]\s+\{(.*)\}\s+(.*)\n$/i', $data, $matches);
        if ($error) {
            $this->handleError($matches[1], $matches[2], $matches[3]);
        }
        return (bool)$error;
    }

    /**
     * @param string $error
     * @param string $command
     * @param string $reason
     */
    private function handleError(string $error, string $command, string $reason)
    {
        /** TODO: Logger */
    }

}
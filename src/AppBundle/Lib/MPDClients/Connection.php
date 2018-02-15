<?php


namespace AppBundle\Lib\MPDClients;


use AppBundle\Lib\Exceptions\MPDConnectionException;
use Socket\Raw\Exception;
use Socket\Raw\Factory;
use Socket\Raw\Socket;

class Connection implements ConnectionInterface
{
    /** @var string */
    private $host;

    /** @var int */
    private $port;

    /** @var Socket */
    private $socket;

    public function __construct(string $host, int $port)
    {
        $this->host = $host;
        $this->port = $port;
    }


    /**
     * @param string $command
     * @return string
     * @throws MPDConnectionException
     */
    public function send(string $command): string
    {
        $this->connect();
        $this->socket->write($command);
        return $this->socket->read(1024);
    }

    /**
     * @throws MPDConnectionException
     */
    private function connect(): void {
        if (!$this->socket) {
            $uri = sprintf('%s:%u', $this->host, $this->port);

            try {
                $sockFactory = new Factory();
                $socket = $sockFactory->createClient($uri);
                $this->socket = $socket;
            } catch (Exception $e) {
                throw new MPDConnectionException($e->getMessage());
            }
            $answer = $socket->read(1024);
            if (!$this->isConnectionOk($answer)) {
                $this->close();
                throw new MPDConnectionException('Server connection failed!');
            }
        }
    }

    private function isConnectionOk(string $data): bool
    {
        return preg_match('/^ok\b/i', $data);
    }

    public function close(): void
    {
        if ($this->socket) {
            $this->socket->close();
        }

    }

}
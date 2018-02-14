<?php


namespace AppBundle\Lib\MPDClients;


use Socket\Raw\Factory;

class Connection implements ConnectionInterface
{
    /** @var string */
    private $host;

    /** @var int */
    private $port;

    /** @var resource */
    private $socket;

    public function __construct(string $host, int $port)
    {
        $this->host = $host;
        $this->port = $port;
    }


    public function send(string $command)
    {
        $this->connect();

    }

    /** @throws  */
    private function connect(): void {
        if (!$this->socket) {
            $uri = sprintf('%s:%c', $this->host, $this->port);
            $sockFactory = new Factory();
            $socket = $sockFactory->createClient($uri);
            var_dump($socket->read(1024));exit;
        }
    }

}
<?php


namespace AppBundle\Lib\MPDClients;


interface ConnectionInterface
{
    public function send(string $command);
}

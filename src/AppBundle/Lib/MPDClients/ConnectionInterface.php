<?php


namespace AppBundle\Lib\MPDClients;


use AppBundle\Lib\Exceptions\MPDConnectionException;

interface ConnectionInterface
{
    /** @throws MPDConnectionException */
    public function send(string $command): string;

    public function close(): void;
}

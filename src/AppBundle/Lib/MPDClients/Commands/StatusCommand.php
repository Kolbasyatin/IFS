<?php


namespace AppBundle\Lib\MPDClients\Commands;


class StatusCommand implements CommandInterface
{

    const COMMAND = 'status';

    public function getCommand(): string
    {
        return static::COMMAND;
    }

    public function getParser(): ParserInterface
    {
        // TODO: Implement getParser() method.
    }

}
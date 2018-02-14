<?php


namespace AppBundle\Lib\MPDClients\Commands;


use AppBundle\Lib\MPDClients\Parsers\ParserInterface;

class StatusCommand extends AbstractCommand implements CommandInterface
{

    const COMMAND = 'status';

    public function getParser(): ParserInterface
    {
        // TODO: Implement getParser() method.
    }

}
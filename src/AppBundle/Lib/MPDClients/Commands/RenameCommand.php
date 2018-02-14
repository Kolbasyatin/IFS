<?php


namespace AppBundle\Lib\MPDClients\Commands;


use AppBundle\Lib\MPDClients\Parsers\ParserInterface;

class RenameCommand extends AbstractCommand implements CommandInterface
{
    const COMMAND = 'rename';

    public function getParser(): ParserInterface
    {
        // TODO: Implement getParser() method.
    }

}
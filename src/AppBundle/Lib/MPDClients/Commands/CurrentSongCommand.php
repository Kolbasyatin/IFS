<?php


namespace AppBundle\Lib\MPDClients\Commands;


use AppBundle\Lib\MPDClients\Parsers\DefaultParser;
use AppBundle\Lib\MPDClients\Parsers\ParserInterface;

class CurrentSongCommand extends AbstractCommand
{
    protected const COMMAND = 'currentsong';

    public function getParser(): ParserInterface
    {
        return new DefaultParser();
    }

}
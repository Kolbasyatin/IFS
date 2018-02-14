<?php


namespace AppBundle\Lib\MPDClients\Commands;


use AppBundle\Lib\MPDClients\Parsers\ParserInterface;

interface CommandInterface
{
    public function getCommand(): string;

    public function getParser(): ParserInterface;
}
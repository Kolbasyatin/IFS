<?php


namespace AppBundle\Lib\MPDClients\Commands;


interface CommandInterface
{
    public function getCommand(): string;

    public function getParser(): ParserInterface;
}
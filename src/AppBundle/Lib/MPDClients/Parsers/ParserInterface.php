<?php


namespace AppBundle\Lib\MPDClients\Parsers;


interface ParserInterface
{
    public function parse(string $data): array;
}
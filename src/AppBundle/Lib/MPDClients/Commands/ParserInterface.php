<?php


namespace AppBundle\Lib\MPDClients\Commands;


interface ParserInterface
{
    public function parse(array $data): array;
}
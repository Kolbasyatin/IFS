<?php


namespace AppBundle\Lib\MPDClients\Commands;


abstract class AbstractCommand implements CommandInterface
{
    protected function filterArguments(...$arguments): string
    {
        foreach ($arguments as $argument) {
            $a = 'b';
        }

        return 'string';
    }
}
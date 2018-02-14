<?php


namespace AppBundle\Lib\MPDClients\Commands;


use AppBundle\Lib\Exceptions\CommandFactoryException;

class CommandFactory
{
    public static function createCommand(string $commandName, $arguments): CommandInterface
    {
        $className = ucfirst($commandName.'Command');
        try {
            $class = new \ReflectionClass('AppBundle\\Lib\\MPDClients\\Commands\\'.$className);
            $instance = $class->newInstanceArgs($arguments);
        } catch (\ReflectionException $e) {
            throw new CommandFactoryException($e->getMessage());
        }

        if (!$instance instanceof CommandInterface) {
            throw new CommandFactoryException('Class created but interface wrong');
        }

        return $instance;
    }
}
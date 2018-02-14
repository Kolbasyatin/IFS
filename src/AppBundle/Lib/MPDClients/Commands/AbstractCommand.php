<?php


namespace AppBundle\Lib\MPDClients\Commands;


abstract class AbstractCommand implements CommandInterface
{
    /** @var array */
    protected $arguments;

    public function __construct(...$arguments)
    {
        $this->arguments = $arguments;
    }

    public function getCommand(): string
    {
        $arguments = $this->getArgumentsAsString();
        return static::COMMAND.$arguments.PHP_EOL;
    }

    protected function getArgumentsAsString(): string
    {
        $argumentString = ' ';
        foreach ($this->arguments as $argument) {
            $argumentString.=$argument.' ';
        }

        return $argumentString;
    }
}
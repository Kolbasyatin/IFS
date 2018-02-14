<?php


namespace AppBundle\Lib\MPDClients\Commands;


class RenameCommand extends AbstractCommand implements CommandInterface
{
    const COMMAND = 'rename';

    /** @var string */
    private $oldName;
    /** @var string */
    private $newName;

    public function __construct(string $old, string $new)
    {
        $this->oldName = $old;
        $this->newName = $new;
    }

    public function getCommand(): string
    {
        return static::COMMAND.' '.$this->filterArguments($this->oldName, $this->newName);
    }

    public function getParser(): ParserInterface
    {
        // TODO: Implement getParser() method.
    }

}
<?php


namespace AppBundle\Model;


class MPDStatusHolder
{

    const DEFAULT_LIFETIME = 2;

    /** @var integer */
    private $listeners;
    /** @var string */
    private $trackName;
    /** @var \DatePeriod */
    private $elapsedTime;
    /** @var string */
    private $sourceName;
    /** @var \DateTime */
    private $createdTime;

    public function __construct()
    {
        $this->createdTime = new \DateTime("now");
    }


    /**
     * @return int
     */
    public function getListeners(): int
    {
        return $this->listeners;
    }

    /**
     * @param int $listeners
     */
    public function setListeners(int $listeners): void
    {
        $this->listeners = $listeners;
    }

    /**
     * @return string
     */
    public function getTrackName(): string
    {
        return $this->trackName;
    }

    /**
     * @param string $trackName
     */
    public function setTrackName(?string $trackName): void
    {
        $this->trackName = $trackName;
    }

    /**
     * @return \DatePeriod
     */
    public function getElapsedTime(): \DatePeriod
    {
        return $this->elapsedTime;
    }

    /**
     * @param \DatePeriod $elapsedTime
     */
    public function setElapsedTime(\DatePeriod $elapsedTime): void
    {
        $this->elapsedTime = $elapsedTime;
    }

    /**
     * @return string
     */
    public function getSourceName(): string
    {
        return $this->sourceName;
    }

    /**
     * @param string $sourceName
     */
    public function setSourceName(string $sourceName): void
    {
        $this->sourceName = $sourceName;
    }

    public function isFresh(): bool
    {
        $difference = $this->createdTime->diff(new \DateTime("now"))->s;

        return $difference <= self::DEFAULT_LIFETIME;
    }

    public static function createHolder(array $data): self
    {
        return new static();
    }

    public function populate(array $data): void
    {

    }




}
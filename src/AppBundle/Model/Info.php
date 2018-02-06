<?php


namespace AppBundle\Model;


class Info
{
    /** @var integer */
    private $listeners;
    /** @var string */
    private $trackName;
    /** @var \DatePeriod */
    private $elapsedTime;

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
    public function setTrackName(string $trackName): void
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


}
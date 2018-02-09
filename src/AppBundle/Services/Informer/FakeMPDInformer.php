<?php


namespace AppBundle\Services\Informer;


class FakeMPDInformer implements InformerInterface
{
    const DEFAULT_NAME = '';
    /** @var string */
    private $id;

    /** @var InformerInterface[] */
    private $informers;

    public function __construct()
    {
        $this->informers = new \SplObjectStorage();
        $this->id = self::DEFAULT_NAME;
    }

    public function addInformer(InformerInterface $informer)
    {
        $this->informers->attach($informer);
    }


    public function getId(): ?string
    {
        return $this->id;
    }

    public function getListeners(): int
    {
        $listeners = 0;
        foreach ($this->informers as $informer) {
            $listeners += $informer->getListeners();
        }

        return $listeners;
    }

    public function getTrackName(): string
    {
        $trackName = '';

        foreach ($this->informers as $informer) {
            $trackName .= $informer->getId() . ':' . $informer->getTrackName() . PHP_EOL;
        }

        return $trackName;
    }

    public function getSourceName(): ?string
    {
        return "Всего";
    }


}
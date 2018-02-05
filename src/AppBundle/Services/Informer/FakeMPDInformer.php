<?php


namespace AppBundle\Services\Informer;


class FakeMPDInformer implements InformerInterface
{
    /** @var string */
    private $id = 'default';

    /** @var InformerInterface[] */
    private $informers;

    public function __construct()
    {
        $this->informers = new \SplObjectStorage();
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


}
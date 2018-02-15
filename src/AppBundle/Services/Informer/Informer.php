<?php


namespace AppBundle\Services\Informer;


class Informer implements InformerInterface
{
    /** @var string */
    private $id;

    /** @var DataProviderInterface */
    private $curlProvider;
    /** @var DataProviderInterface  */
    private $mpdProvider;

    /** @var string */
    private $sourceName;

    /**
     * Informer constructor.
     * @param string $id
     * @param string $sourceName
     * @param DataProviderInterface $curlProvider
     * @param DataProviderInterface $mpdProvider
     */
    public function __construct(string $id, string $sourceName, DataProviderInterface $curlProvider, DataProviderInterface $mpdProvider)
    {
        $this->id = $id;
        $this->curlProvider = $curlProvider;
        $this->mpdProvider = $mpdProvider;
        $this->sourceName = $sourceName;
    }


    public function getId(): ?string
    {
        return $this->id;
    }


    public function getListeners(): ?int
    {
        return $this->curlProvider->getListeners();

    }

    public function getTrackName(): ?string
    {
        return $this->mpdProvider->getTrackName();
    }

    public function getSourceName(): ?string
    {
        return $this->sourceName;
    }


}
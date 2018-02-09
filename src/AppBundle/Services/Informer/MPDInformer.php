<?php


namespace AppBundle\Services\Informer;


class MPDInformer implements InformerInterface
{
    /** @var string */
    private $id;

    /** @var DataProviderInterface */
    private $dataProvider;

    /** @var string */
    private $sourceName;

    /**
     * MPDInformer constructor.
     * @param string $id
     * @param string $sourceName
     * @param DataProviderInterface $dataProvider
     */
    public function __construct(string $id, string $sourceName, DataProviderInterface $dataProvider)
    {
        $this->id = $id;
        $this->dataProvider = $dataProvider;
        $this->sourceName = $sourceName;
    }


    public function getId(): ?string
    {
        return $this->id;
    }

    public function getListeners(): ?int
    {
        return $this->dataProvider->getListeners();
    }

    public function getTrackName(): ?string
    {
        return $this->dataProvider->getTrackName();
    }

    public function getSourceName(): ?string
    {
        return $this->sourceName;
    }


}
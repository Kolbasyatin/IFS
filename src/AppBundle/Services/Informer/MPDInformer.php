<?php


namespace AppBundle\Services\Informer;


class MPDInformer implements InformerInterface
{
    /** @var string */
    private $id;

    /** @var DataProviderInterface */
    private $dataProvider;

    /**
     * MPDInformer constructor.
     * @param string $id
     * @param DataProviderInterface $dataProvider
     */
    public function __construct(string $id, DataProviderInterface $dataProvider)
    {
        $this->id = $id;
        $this->dataProvider = $dataProvider;
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

}
<?php


namespace AppBundle\Services\Informer\DataProviders;


use AppBundle\Lib\Exceptions\InformerException;
use AppBundle\Lib\MPDClients\MPDClient;
use AppBundle\Services\Informer\DataProviderInterface;

class MPDDataProvider implements DataProviderInterface
{
    /** @var MPDClient */
    private $mpdClient;

    public function __construct(MPDClient $client)    {
        $this->mpdClient = $client;
    }


    /**
     * @return int|null
     * @throws InformerException
     */
    public function getListeners(): ?int
    {
        throw new InformerException('Can not get Listeners in this data provider');
    }

    public function getTrackName(): ?string
    {
        $data = $this->mpdClient->currentSong();

        return $data['Title']??$data['file']??'Ой, что то случилось.';
    }

    public function getSourceName(): ?string
    {
    }


}
<?php


namespace AppBundle\Services\Informer\DataProviders;


use AppBundle\Lib\MPDClients\MPDClient;
use AppBundle\Model\InfoData;
use AppBundle\Services\Informer\DataProviderInterface;

class MPDDataProvider implements DataProviderInterface
{
    /** @var MPDClient */
    private $mpdClient;

    public function __construct(MPDClient $client)    {
        $this->mpdClient = $client;
    }


    public function getListeners(): ?int
    {
        $this->getData()->getListeners();
    }

    public function getTrackName(): ?string
    {
        $data = $this->mpdClient->currentSong();

        return $data['Title']??$data['file']??'Ой, что то случилось.';
    }

    public function getSourceName(): ?string
    {
        $this->getData()->getSourceName();
    }

    private function getData(): ?InfoData
    {
        $info = new  InfoData();
        $data = $this->mpdClient->status();

        return $this->parseInfo($data);

    }

    private function parseInfo(array $data): InfoData
    {
        $info = new InfoData();

        return $info;
    }


}
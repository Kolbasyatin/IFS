<?php


namespace AppBundle\Services\Informer\DataProviders;

use AppBundle\Lib\Exceptions\InformerException;
use AppBundle\Lib\MPDClients\MPDClient;
use AppBundle\Services\Informer\DataProviderInterface;

/**
 * Class MPDDataProvider
 * @package AppBundle\Services\Informer\DataProviders
 */
class MPDDataProvider implements DataProviderInterface
{
    /** @var MPDClient */
    private $mpdClient;

    public function __construct(MPDClient $client)
    {
        $this->mpdClient = $client;
    }

    /**
     * @return int
     * @throws InformerException
     */
    public function getListeners(): int
    {
        throw new InformerException('Can not get Listeners in this data provider');
    }

    public function getTrackName(): ?string
    {
        $data = $this->mpdClient->currentSong();
        return $data['Title'] ?? $data['file'] ?? 'Ой, что то случилось.';
    }

    /**
     * @return string
     * @throws InformerException
     */
    public function getSourceName(): string
    {
        throw new InformerException('Can not get SourceName in this data provider');
    }


}
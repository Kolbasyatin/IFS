<?php


namespace AppBundle\Services\Informer\DataProviders;


use AppBundle\Lib\Exceptions\CurlIceCastDataProviderException;
use AppBundle\Model\InfoData;
use AppBundle\Services\Informer\DataProviderInterface;
use GuzzleHttp\Client;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\PropertyAccess\PropertyAccessor;

class CurlIceCastDataProvider implements DataProviderInterface
{

    /** @var Client */
    private $httpClient;

    /** @var string */
    private $url;

    /** @var string */
    private $listenUrl;

    /** @var PropertyAccessor */
    private $accessor;

    /** @var InfoData */
    private $data;

    /**
     * CurlIceCastDataProvider constructor.
     * @param string $url
     * @param string $listenUrl
     */
    public function __construct(string $url, string $listenUrl)
    {
        $this->httpClient = new Client();
        $this->url = $url;
        $this->listenUrl = $listenUrl;
        $this->accessor = PropertyAccess::createPropertyAccessor();

    }


    public function getListeners(): ?int
    {
        return $this->getData()->getListeners();
    }

    public function getTrackName(): ?string
    {
        return $this->getData()->getTrackName();
    }

    public function getSourceName(): ?string
    {
        return $this->getData()->getSourceName();
    }


    private function getData(): InfoData
    {
        if ($this->data && $this->data->isFresh()) {
            return $this->data;
        } else {
            $info = new InfoData();
            $response = $this->httpClient->request('GET', $this->url);
            if (200 === $response->getStatusCode()) {
                $json = (string)$response->getBody();
                $dataArray = json_decode($json, true);
                $sourceData = $this->splitData($dataArray);
                $this->parseData($info, $sourceData);
            }
            $this->data = $info;
        }

        return $info;

    }

    private function splitData(array $data): array
    {
        $sources = $this->accessor->getValue($data, '[icestats][source]');
        $result = array_filter(
            $sources,
            function ($source) {
                return $source['listenurl'] === $this->listenUrl;
            }
        );
        if (!is_array($result)) {
            throw new CurlIceCastDataProviderException('No result');
        }

        return array_shift($result);
    }

    /** TODO: Выделить отдельный парсер ? по идее стоит использовать сериализатор.
     * @param InfoData $info
     * @param array $data
     */
    private function parseData(InfoData $info, array $data): void
    {
        $info->setListeners((int)$this->accessor->getValue($data, '[listeners]'));
        $info->setTrackName($this->accessor->getValue($data, '[title]'));
        $info->setSourceName((string)$this->accessor->getValue($data, '[server_name]'));
    }

}
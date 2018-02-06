<?php


namespace AppBundle\Services\Informer\DataProviders;


use AppBundle\Lib\Exceptions\CurlIceCastDataProviderException;
use AppBundle\Model\Info;
use AppBundle\Services\Informer\DataProviderInterface;
use GuzzleHttp\Client;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\PropertyAccess\PropertyAccessor;

class CurlIceCastDataProvider implements DataProviderInterface
{
    /** @var string */
    private $sourceId;

    /** @var Client */
    private $httpClient;

    /** @var string */
    private $url;

    /** @var string */
    private $listenUrl;

    /** @var PropertyAccessor */
    private $accessor;

    /**
     * CurlIceCastDataProvider constructor.
     * @param string $sourceId
     * @param string $url
     * @param string $listenUrl
     */
    public function __construct(string $sourceId, string $url, string $listenUrl)
    {
        $this->sourceId = $sourceId;
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

    private function getData(): Info
    {
        $info = new Info();
        $response = $this->httpClient->request('GET', $this->url);
        if (200 === $response->getStatusCode()) {
            $json = (string)$response->getBody();
            $dataArray = json_decode($json, true);
            $sourceData = $this->splitData($dataArray);
            $this->parseData($info, $sourceData);
        }

        return $info;

    }

    private function splitData(array $data): array
    {
        $sources = $this->accessor->getValue($data, '[icestats][source]');
        $result = array_filter($sources, function ($source) {
            return $source['listenurl'] === $this->listenUrl;
        });
        if (!is_array($result)) {
            throw new CurlIceCastDataProviderException('No result');
        }

        return array_shift($result);
    }

    /** TODO: Выделить отдельный парсер ? по идее стоит использовать сериализатор.
     * @param Info $info
     * @param array $data
     */
    private function parseData(Info $info, array $data): void
    {
        $info->setListeners((int)$this->accessor->getValue($data, '[listeners]'));
        $info->setTrackName($this->accessor->getValue($data, '[title]'));
    }

}
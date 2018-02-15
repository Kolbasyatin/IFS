<?php


namespace AppBundle\Services\Informer\DataProviders;


use AppBundle\Lib\Exceptions\CurlIceCastDataProviderException;
use AppBundle\Model\MPDStatusHolder;
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

    /** @var MPDStatusHolder */
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


    /**
     * @return int|null
     * @throws CurlIceCastDataProviderException
     */
    public function getListeners(): ?int
    {
        return $this->getData()->getListeners();
    }

    /**
     * @return null|string
     * @throws CurlIceCastDataProviderException
     */
    public function getTrackName(): ?string
    {
        return $this->getData()->getTrackName();
    }

    /**
     * @return null|string
     * @throws CurlIceCastDataProviderException
     */
    public function getSourceName(): ?string
    {
        return $this->getData()->getSourceName();
    }


    /**
     * @return MPDStatusHolder
     * @throws CurlIceCastDataProviderException
     */
    private function getData(): MPDStatusHolder
    {
        if ($this->data && $this->data->isFresh()) {
            return $this->data;
        } else {
            $response = $this->httpClient->request('GET', $this->url);
            if (200 === $response->getStatusCode()) {
                $json = (string)$response->getBody();
                $dataAsArray = json_decode($json, true);

                if (!$dataAsArray) {
                    throw new CurlIceCastDataProviderException('No result');
                }

                $sourceData = $this->splitAndGetRequiredSourceData($dataAsArray);
                $statusHolder = new MPDStatusHolder();
                $this->parseData($statusHolder, $sourceData);
            }
            $this->data = $statusHolder;
        }

        return $statusHolder;

    }

    /**
     * @param array $data
     * @return array
     * @throws CurlIceCastDataProviderException
     */
    private function splitAndGetRequiredSourceData(array $data): array
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
     * @param MPDStatusHolder $info
     * @param array $data
     */
    private function parseData(MPDStatusHolder $info, array $data): void
    {
        $info->setListeners((int)$this->accessor->getValue($data, '[listeners]'));
        $info->setTrackName($this->accessor->getValue($data, '[title]'));
        $info->setSourceName((string)$this->accessor->getValue($data, '[server_name]'));
    }

}
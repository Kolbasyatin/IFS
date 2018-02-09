<?php


namespace AppBundle\WebSocket\PubSub;


use AppBundle\Services\Informer\InformManager;
use AppBundle\Services\ListenersStat;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Topic\PushableTopicInterface;
use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Gos\Bundle\WebSocketBundle\Topic\TopicPeriodicTimerInterface;
use Gos\Bundle\WebSocketBundle\Topic\TopicPeriodicTimerTrait;
use Psr\Log\LoggerInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;

class TrackTopic implements TopicInterface, PushableTopicInterface, TopicPeriodicTimerInterface
{

    use TopicPeriodicTimerTrait;
    /** @var InformManager */
    private $informManager;
    /** @var ListenersStat */
    private $listenersStat;
    /** @var LoggerInterface */
    private $logger;

    /**
     * ListenersTopic constructor.
     * @param InformManager $informManager
     */
    public function __construct(InformManager $informManager, ListenersStat $listenersStat, LoggerInterface $logger)
    {
        $this->informManager = $informManager;
        $this->listenersStat = $listenersStat;
        $this->logger = $logger;
    }


    public function onPush(Topic $topic, WampRequest $request, $data, $provider)
    {
        // TODO: Implement onPush() method.
    }

    public function onSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        $trackName = $this->informManager->getTrackName();
        /** @var $msg string*/
        $msg = ['tracks' => json_encode($trackName, JSON_UNESCAPED_UNICODE)];
        $topic->broadcast($msg);
    }

    public function onUnSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        // TODO: Implement onUnSubscribe() method.
    }

    /**
     * @param ConnectionInterface $connection
     * @param Topic $topic
     * @param WampRequest $request
     * @param $event
     * @param array $exclude
     * @param array $eligible
     */
    public function onPublish(
        ConnectionInterface $connection,
        Topic $topic,
        WampRequest $request,
        $event,
        array $exclude,
        array $eligible
    ) {
        // TODO: Implement onPublish() method.
    }

    public function registerPeriodicTimer(Topic $topic)
    {
        $this->periodicTimer->addPeriodicTimer(
            $this,
            'checkTrack',
            7,
            function () use ($topic) {
                /** @var $msg string */
                try {
                    $trackName = $this->informManager->getTrackName();
                } catch (\Throwable $e) {
                    $this->logger->alert('Error in received Track. '.$e->getMessage());
                }
                $msg = ['tracks' => json_encode($trackName, JSON_UNESCAPED_UNICODE)];
                $topic->broadcast($msg);
            }
        );
    }


    public function getName()
    {
        return 'track.topic';
    }

}
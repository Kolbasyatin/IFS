<?php


namespace AppBundle\WebSocket\PubSub;


use AppBundle\Lib\Informer\InformerException;
use AppBundle\Services\Informer\InformManager;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Topic\PushableTopicInterface;
use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;

class ListenersTopic implements TopicInterface, PushableTopicInterface
{

    /** @var InformManager */
    private $informManager;

    /**
     * ListenersTopic constructor.
     * @param InformManager $informManager
     */
    public function __construct(InformManager $informManager)
    {
        $this->informManager = $informManager;
    }


    public function onPush(Topic $topic, WampRequest $request, $data, $provider)
    {
        // TODO: Implement onPush() method.
    }

    public function onSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        try {
            $informer = $this->informManager->getInformer('default');
        } catch (InformerException $e) {

        }
        $listeners = $informer->getListeners();
        dump($listeners);
        $topic->broadcast(['msg' => $listeners]);
    }

    public function onUnSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        // TODO: Implement onUnSubscribe() method.
    }

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

    public function getName()
    {
        return 'listeners.topic';
    }

}
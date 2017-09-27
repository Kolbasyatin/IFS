<?php


namespace AppBundle\WebSocket\PubSub;


use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Topic\PushableTopicInterface;
use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;

class SourceTopic implements TopicInterface, PushableTopicInterface
{
    public function onPush(Topic $topic, WampRequest $request, $data, $provider)
    {
        // TODO: Implement onPush() method.
    }

    public function onSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        // TODO: Implement onSubscribe() method.
    }

    public function onUnSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        // TODO: Implement onUnSubscribe() method.
    }

    public function onPublish(ConnectionInterface $connection, Topic $topic, WampRequest $request, $event, array $exclude, array $eligible)
    {
        // TODO: Implement onPublish() method.
    }

    public function getName()
    {
        return 'source.topic';
    }

}
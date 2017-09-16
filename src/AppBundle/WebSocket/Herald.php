<?php


namespace AppBundle\WebSocket;


use AppBundle\Services\TestService;
use Gos\Bundle\WebSocketBundle\Client\ClientManipulator;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Topic\PushableTopicInterface;
use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;
use Ratchet\Wamp\WampConnection;

class Herald implements TopicInterface, PushableTopicInterface
{
    /** @var  TestService */
    private $testService;

    private $topic;

    /** @var  ClientManipulator */
    private $clientManipulator;

    /**
     * Herald constructor.
     * @param TestService $testService
     * @param ClientManipulator $clientManipulator
     */
    public function __construct(TestService $testService, ClientManipulator $clientManipulator )
    {
        $this->testService = $testService;
        $this->clientManipulator = $clientManipulator;
    }

    public function onSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        $this->topic = $topic;

        $client = $this->clientManipulator->getClient($connection);

        /** @var WampConnection $connection */
        /** @var string $msg На самом деле array, но IDE напрягает подсвечивать */
        $msg = ['msg' => ''. " has joined " . $topic->getId(). $this->testService->sayHello()];
        $topic->broadcast($msg);
    }

    public function onUnSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        /** @var WampConnection $connection */
        /** @var string $msg */
        $msg = ['msg' => $connection->resourceId . " has left " . $topic->getId()];
        $topic->broadcast($msg);
    }

    public function onPublish(ConnectionInterface $connection, Topic $topic, WampRequest $request, $event, array $exclude, array $eligible)
    {
        /*
           $topic->getId() will contain the FULL requested uri, so you can proceed based on that

           if ($topic->getId() === 'acme/channel/shout')
               //shout something to all subs.
       */
        /** @var string $msg */
        $msg = ['msg' => $event];
        $topic->broadcast($msg);
    }

    public function getName()
    {
        return 'herald.topic';
    }

    public function onPush(Topic $topic, WampRequest $request, $data, $provider)
    {
        dump('asdf');
    }


    public function getTopic()
    {
        return $this->topic;
    }

}
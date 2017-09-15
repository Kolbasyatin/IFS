<?php


namespace AppBundle\WebSocket;


use Gos\Bundle\WebSocketBundle\Periodic\PeriodicInterface;
use Ratchet\Wamp\Topic;

class StreamStatusChecker implements PeriodicInterface
{

    private $herald;

    public function __construct(Herald $herald)
    {
        $this->herald = $herald;
    }


    public function tick()
    {

        $topic = $this->herald->getTopic();
        /** @var Topic $topic */
        if ($topic) {
            $msg = ['msg' => 'Im from status Checker!!!'];
            $topic->broadcast($msg);
        }

    }

    public function getTimeout()
    {
        return 8;
    }
}
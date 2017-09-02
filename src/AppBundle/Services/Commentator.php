<?php


namespace AppBundle\Services;


use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\RPC\RpcInterface;
use Ratchet\ConnectionInterface;

class Commentator implements RpcInterface
{
    public function comment(ConnectionInterface $connection, WampRequest $request, array $params)
    {
        return ["result" => array_sum($params)];
    }

    public function getName()
    {
        return 'commentator.rpc';
    }

}
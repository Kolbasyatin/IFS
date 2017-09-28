<?php


namespace AppBundle\WebSocket\RPC;


use Gos\Bundle\WebSocketBundle\RPC\RpcInterface;

class CommentRPC implements RpcInterface
{
    public function getName()
    {
        return "comment.rpc";
    }

}
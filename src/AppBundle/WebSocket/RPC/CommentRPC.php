<?php


namespace AppBundle\WebSocket\RPC;


use AppBundle\Services\Commentator;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\RPC\RpcInterface;
use Ratchet\ConnectionInterface;

class CommentRPC implements RpcInterface
{
    /** @var  Commentator */
    private $commentator;

    /**
     * CommentRPC constructor.
     * @param Commentator $commentator
     */
    public function __construct(Commentator $commentator)
    {
        $this->commentator = $commentator;
    }

    public function getCommentsFirstPageBySource(ConnectionInterface $connection, WampRequest $request, array $params)
    {
        $comments = $this->commentator->getFirstPage($params['source']);

        return [json_encode($comments, JSON_UNESCAPED_UNICODE)];
    }

    public function getCommentsNewerThanId(ConnectionInterface $connection, WampRequest $request, array $params)
    {
        try {
            $comments = $this->commentator->getNewerCommentsThanId($params['source'], $params['lastCommentId']);
        } catch (\Exception $e) {
            $a = 'b';
        }


        return [json_encode($comments, JSON_UNESCAPED_UNICODE)];
    }


    public function getName()
    {
        return "comment.rpc";
    }

}
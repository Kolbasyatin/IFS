<?php


namespace AppBundle\EventListener;


use AppBundle\Entity\Comment;
use Doctrine\Common\EventSubscriber;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\OnFlushEventArgs;
use Doctrine\ORM\Event\PostFlushEventArgs;
use Doctrine\ORM\Events;
use Gos\Bundle\WebSocketBundle\Pusher\Zmq\ZmqPusher;

class CommentSubscriber implements EventSubscriber
{
    /** @var  ZmqPusher */
    private $zmqPusher;

    /**
     * CommentSubscriber constructor.
     * @param ZmqPusher $zmqPusher
     */
    public function __construct(ZmqPusher $zmqPusher)
    {
        $this->zmqPusher = $zmqPusher;
    }


    public function getSubscribedEvents()
    {
        return [
            Events::onFlush,
        ];
    }

    public function onFlush(OnFlushEventArgs $args)
    {
        $comments = [];
        $newComments = $args->getEntityManager()->getUnitOfWork()->getScheduledEntityInsertions();
        foreach ($newComments as $newComment) {
            /** @var Comment $newComment */
            $comments[] = $newComment;
        }

        if (count($comments)) {
            $this->push('newcomment', $comments);
        }

    }

    private function push(string $action, array $comments)
    {
        $msg = [
            'action' => $action,
            'data' => json_encode($comments, JSON_UNESCAPED_UNICODE)
        ];
        $this->zmqPusher->push($msg, 'comment', [], ['context']);
    }

}
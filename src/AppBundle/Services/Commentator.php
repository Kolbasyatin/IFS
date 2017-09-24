<?php

namespace AppBundle\Services;


use AppBundle\Entity\Comment;
use AppBundle\Lib\Exceptions\CommentatorException;
use AppBundle\Repository\CommentRepository;
use Doctrine\ORM\EntityManager;

class Commentator
{
    /** @var  EntityManager */
    protected $em;
    /** @var  CommentRepository */
    private $repository;

    /**
     * Commentator constructor.
     * @param EntityManager $em
     */

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
        $this->repository = $em->getRepository(Comment::class);
    }

    public function createComment(Comment $comment, string $sourceId = null)
    {
        //TODO: Подумать как проверять тут доступ на создание новостей.
        if ($sourceId) {
            $source = $this->em->find('AppBundle:Source', $sourceId);
            $comment->setTargetSource($source);
        } elseif ($comment->getType() !== Comment::TYPE_NEWS) {
            throw new CommentatorException('Замануха!');
        }
        $this->em->persist($comment);
        $this->em->flush($comment);
    }

    public function createJsonComment(string $json)
    {
        /** TODO: Implement create comment from json ?? */
    }
}
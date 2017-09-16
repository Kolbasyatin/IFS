<?php

namespace AppBundle\Services;


use AppBundle\Entity\Comment;
use AppBundle\Entity\CommentRepository;
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

    public function createComment(Comment $comment)
    {
        $this->em->persist($comment);
        $this->em->flush($comment);
    }

    public function createJsonComment(string $json)
    {
        /** TODO: Implement create comment from json ?? */
    }
}
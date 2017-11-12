<?php


namespace AppBundle\Services;


use AppBundle\Entity\Comment;
use AppBundle\Entity\Source;
use AppBundle\Entity\User;
use AppBundle\Lib\CommentatorException;
use AppBundle\Repository\CommentRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMInvalidArgumentException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class Commentator
{
    /** @var  AuthorizationChecker */
    protected $authorizationChecker;

    /** @var  CommentRepository */
    protected $repo;

    /** @var EntityManager */
    protected $em;
    /**
     * Commentator constructor.
     * @param AuthorizationChecker $authorizationChecker
     * @param EntityManager $em
     */
    public function __construct(AuthorizationChecker $authorizationChecker, EntityManager $em)
    {
        $this->authorizationChecker = $authorizationChecker;
        $this->repo = $em->getRepository(Comment::class);
        $this->em = $em;
    }


    public function createComment(Request $request, User $user, string $type, Source $source = null): Comment
    {
        $comment = new Comment();
        /** @var User $user */
        $comment
            ->setOwnerUser($user)
            ->setIP($request->getClientIp())
            ->setType($type);
        if ($source) {
            $comment->setTargetSource($source);
        }
        if ($comment->getType() === Comment::TYPE_NEWS && !$this->authorizationChecker->isGranted('ROLE_NEWS_NEW')) {
            throw new AccessDeniedException('Access Denied.');
        }

        return $comment;
    }

    public function getFirstPage(string $source = ''): array {
        return $this->repo->getReversePageCommentBySource($source, 1);
    }

    public function getNewerCommentsThanId(string $source = '', int $lastCommentId)
    {
        return $this->repo->getCommentsNewerId($source, $lastCommentId);
    }


    public function removeComment(Comment $comment = null): void
    {
        if (null === $comment) {
            throw new CommentatorException('No Comment Found');
        }
        try {
            $this->em->remove($comment);
            $this->em->flush($comment);
            $this->em->clear();
        } catch (ORMInvalidArgumentException|OptimisticLockException $e) {
            throw new CommentatorException($e->getMessage());
        }

    }

}
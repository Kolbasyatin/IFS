<?php


namespace AppBundle\Services;


use AppBundle\Entity\Comment;
use AppBundle\Entity\Source;
use AppBundle\Entity\User;
use AppBundle\Repository\CommentRepository;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class Commentator
{
    /** @var  AuthorizationChecker */
    protected $authorizationChecker;

    /** @var  CommentRepository */
    protected $repo;

    /**
     * Commentator constructor.
     * @param AuthorizationChecker $authorizationChecker
     * @param EntityManager $em
     */
    public function __construct(AuthorizationChecker $authorizationChecker, EntityManager $em)
    {
        $this->authorizationChecker = $authorizationChecker;
        $this->repo = $em->getRepository(Comment::class);
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

    public function getFirstPage(): array {
        return $this->repo->getReversePageComment(1);
    }


}
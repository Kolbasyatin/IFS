<?php


namespace AppBundle\Services;


use AppBundle\Entity\Comment;
use AppBundle\Entity\Source;
use AppBundle\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class Commentator
{
    /** @var  AuthorizationChecker */
    protected $authorizationChecker;

    /**
     * Commentator constructor.
     * @param AuthorizationChecker $authorizationChecker
     */
    public function __construct(AuthorizationChecker $authorizationChecker)
    {
        $this->authorizationChecker = $authorizationChecker;
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

}
<?php


namespace AppBundle\Controller;
use AppBundle\Entity\Comment;
use AppBundle\Entity\User;
use AppBundle\Form\CommentType;
use AppBundle\Services\Commentator;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Class CommentController
 * @package AppBundle\Controller
 * @Route("/comment")
 */
class CommentController extends Controller
{
    /**
     * @Route("/new", name="comment_new" )
     * @Security("has_role('ROLE_COMMENT_NEW')")
     */
    public function newAction(Request $request, Commentator $commentator, UserInterface $user = null)
    {
        $comment = new Comment();
        /** @var User $user */
        $comment->setOwnerUser($user);
        $form = $this->createForm(CommentType::class, $comment);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $commentator->createComment($comment);
        }
        return $this->render('comment/new.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
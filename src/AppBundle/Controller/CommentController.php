<?php


namespace AppBundle\Controller;
use AppBundle\Entity\Comment;
use AppBundle\Entity\User;
use AppBundle\Form\CommentType;
use AppBundle\Services\Commentator;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
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
     * @Route("/new", name="comment_new", options={"expose" = true } )
     * @Security("has_role('ROLE_COMMENT_NEW')")
     * @param Request $request
     * @param Commentator $commentator
     * @param UserInterface|null $user
     * @return JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function newAction(Request $request, Commentator $commentator, UserInterface $user = null)
    {
        $request->getSession()->get('sourceId');
        $comment = new Comment();
        /** @var User $user */
        $comment
            ->setOwnerUser($user)
            ->setIP($request->getClientIp())
        ;
        $form = $this->createForm(CommentType::class, $comment);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $commentator->createComment($comment, $request->request->get('sourceId'));
            return new JsonResponse([
                'error' => false,
                'commentId' => $comment->getId(),
                'createdAt' => $comment->getCreatedAt()
            ]);

        }
        return $this->render('comment/new.html.twig', [
            'form' => $form->createView()
        ]);
    }

}
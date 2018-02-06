<?php


namespace AppBundle\Controller;
use AppBundle\Entity\Comment;
use AppBundle\Entity\Source;
use AppBundle\Entity\User;
use AppBundle\Form\CommentType;
use AppBundle\Lib\CommentatorException;
use AppBundle\Services\Commentator;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use AppBundle\Controller\BaseController as Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Class CommentController
 * @package AppBundle\Controller
 * @Route("/comment")
 */
class CommentController extends AbstractController
{
    /**
     * @Route(
     *     "/new/{type}/{source_id}",
     *      name="comment_new",
     *      options={"expose" = true },
     *      defaults={"source_id" = null, "type" = "comment"},
     *     requirements={"type" = AppBundle\Entity\Comment::ROUTE_TYPES_RESTRICTIONS}
     * )
     * @ParamConverter("source", options={ "mapping": {"source_id"="humanId"}})
     * @Security("has_role('ROLE_COMMENT_NEW') or has_role('ROLE_NEWS_NEW')")
     * @param Request $request
     * @param UserInterface|User $user
     * @param Source|null $source
     * @param string $type
     * @param Commentator $commentator
     * @return JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function newAction(Request $request, string $type, Source $source = null,  UserInterface $user = null, Commentator $commentator)
    {
        $comment = $commentator->createComment($request, $user, $type, $source);

        $form = $this->createForm(CommentType::class, $comment);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($comment);
            $em->flush();
            return new JsonResponse([
                'error' => false,
                'id' => $comment->getId(),
                'createdAt' => $comment->getCreatedAt()
            ]);

        }
        return $this->render('comment/new.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @param Comment $comment
     * @param Commentator $commentator
     * @return JsonResponse
     * @Route("/delete/{id}", name="comment_delete", options={"expose" = true } )
     * @Security("has_role('ROLE_COMMENT_DELETE')")
     */
    public function deleteAction(Comment $comment = null, Commentator $commentator)
    {
        try {
            $commentator->removeComment($comment);
            $error = false;
            $message = 'Comment was deleted successful';
        } catch (CommentatorException $e) {
            $error = true;
            $message = $e->getMessage();
        }

        return new JsonResponse([
            'error' => $error,
            'message' => $message,
        ]);

    }
}
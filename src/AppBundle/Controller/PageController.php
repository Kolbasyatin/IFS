<?php


namespace AppBundle\Controller;


use AppBundle\WebSocket\Herald;
use AppBundle\Controller\BaseController as Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends Controller
{
    /** @Route("/", name="index") */
    public function indexAction()
    {
        return $this->render(':page:index.html.twig');
    }

    /** @Route("/test", name="test") */
    public function testAction(Herald $herald)
    {

//        $pusher = $this->container->get('gos_web_socket.zmq.pusher');
//        $pusher->push('asdf', 'herald', ['message' => 'fdsf']);
//
//        return $this->render('::base.html.twig');
        return new Response("");
    }
}
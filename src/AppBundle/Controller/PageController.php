<?php


namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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
    public function testAction()
    {
        return new Response('Allohha!');
    }
}
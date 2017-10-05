<?php


namespace AppBundle\Controller;


use AppBundle\Entity\Comment;
use AppBundle\Controller\BaseController as Controller;
use AppBundle\Entity\Source;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Ip;
use Symfony\Component\Validator\Constraints\IpValidator;

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

//        $sources = $this->getDoctrine()->getRepository('AppBundle:Source')->findAll();

        $comments = [];
        $data = file_get_contents($this->get('kernel')->getRootDir() . '/../systems/comments.xml');
        $data = simplexml_load_string($data);
        $sourceMap = [
            1 => $this->getDoctrine()->getRepository('AppBundle:Source')->findOneBy(['humanId' => 'mds_voice']),
            2 => $this->getDoctrine()->getRepository('AppBundle:Source')->findOneBy(['humanId' => 'mds_music'])
        ];

        foreach ($data->xpath('row') as $row) {
            $comments[] = [
                'sourceid' => (string)$row->xpath('field')[1],
                'text' => (string)$row->xpath('field')[2],
                'name' => (string)$row->xpath('field')[3],
                'date' => (string)$row->xpath('field')[4],
                'ip' => (string)$row->xpath('field')[5],
            ];


        }
        $em = $this->get('doctrine.orm.default_entity_manager');

        foreach ($comments as $commentData) {
            $comment = new Comment();
            $comment->setText($commentData['text']);
            $comment->setLegacyUserName($commentData['name']);
            if (!$commentData['sourceid']) {
                $comment->setType(Comment::TYPE_NEWS);
            } else {
                $comment->setType(Comment::TYPE_COMMENT);
                $comment->setTargetSource($sourceMap[(int)$commentData['sourceid']]);
            }
            $ip = $commentData['ip'];

            if (!empty($ip) && filter_var($ip, FILTER_VALIDATE_IP, 4)) {
                $comment->setIp($ip);
            }


            $em->persist($comment);
        }

//        $em->flush();
        return new Response("allok");
    }
}
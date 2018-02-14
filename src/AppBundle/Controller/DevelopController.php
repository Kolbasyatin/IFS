<?php


namespace AppBundle\Controller;


use AppBundle\Lib\Exceptions\MPDClientException;
use AppBundle\Lib\MPDClients\MPDClient;
use AppBundle\Services\Informer\InformManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;


class DevelopController extends Controller
{
    /**
     * @Route("/test", name="test")
     * @IsGranted("ROLE_ADMIN")
     */
    public function index(InformManager $manager, MPDClient $client) {

        try {
            $client->status();
        } catch (MPDClientException $e) {
            dump($e->getMessage());exit;
        }



        $data = [];
        $listeners = $manager->getListeners();
        $data['listeners'] = $listeners;
        return $this->render(':develop:test.html.twig', $data);
    }


//    public function testAction(InformManager $infoManager)
//    {
//        $dataProvider = $this->get('app.informer.manager');

//        $a = 'b';
//        $config = [
//            'connection' => [
//                'host' => 'ice.planeset.ru',
//                'port' => 6600,
//                'socket' => null
//            ],
//            'options' => [
//                'password' => null
//            ]
//
//        ];
//
//        $connection = new Native($config['connection']);
//        $client = new Client($connection, $config['options']);
//        $client->getCurrentSong()->then(function ($s) {
//            $a = 'b';
//        }, function () {
//            $b = 'c';
//        }, function () {
//            $d = 'e';
//        });
//
//        while (true) {
//            usleep(100000); // sleep 100 ms
//            $connection->receive(); // and see if there's any new data
//        }


//
//        $comments = [];
//        $data = file_get_contents($this->get('kernel')->getRootDir() . '/../systems/comments.xml');
//        $data = simplexml_load_string($data);
//        $sourceMap = [
//            1 => $this->getDoctrine()->getRepository('AppBundle:Source')->findOneBy(['humanId' => 'mds_voice']),
//            2 => $this->getDoctrine()->getRepository('AppBundle:Source')->findOneBy(['humanId' => 'mds_music'])
//        ];
//
//        foreach ($data->xpath('row') as $row) {
//            $comments[] = [
//                'sourceid' => (string)$row->xpath('field')[1],
//                'text' => (string)$row->xpath('field')[2],
//                'name' => (string)$row->xpath('field')[3],
//                'date' => (string)$row->xpath('field')[4],
//                'ip' => (string)$row->xpath('field')[5],
//            ];
//
//
//        }
//        $em = $this->get('doctrine.orm.default_entity_manager');
//
//
//        foreach ($comments as $commentData) {
//            $comment = new Comment();
//            $comment->setText($commentData['text']);
//            $comment->setLegacyUserName($commentData['name']);
//            if (!$commentData['sourceid']) {
//                $comment->setType(Comment::TYPE_NEWS);
//            } else {
//                $comment->setType(Comment::TYPE_COMMENT);
//                $comment->setTargetSource($sourceMap[(int)$commentData['sourceid']]);
//            }
//            $ip = $commentData['ip'];
//
//            if (!empty($ip) && filter_var($ip, FILTER_VALIDATE_IP, 4)) {
//                $comment->setIp($ip);
//            }
//
//            $date = new \DateTime($commentData['date']);
//            $comment->setCreatedAt($date);
//            $comment->setUpdatedAt($date);
//
//            $em->persist($comment);
//        }
//
////
//        $em->flush();
//        return new Response("allok");
//        return $this->render(':page:test.html.twig');
//    }
}
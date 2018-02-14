<?php


namespace AppBundle\Controller;


use AppBundle\Lib\Exceptions\MPDClientException;
use AppBundle\Services\Informer\InformManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\Routing\Annotation\Route;


class DevelopController extends Controller
{
    /** @var Container */
    protected $container;
    /**
     * @Route("/test", name="test")
     * @IsGranted("ROLE_ADMIN")
     */
    public function index(InformManager $manager) {

//        $client = $this->container->get('app.mpd.client.music');
//        try {
//            $currentSong = $client->currentSong();
//            var_dump($currentSong);exit;
//        } catch (MPDClientException $e) {
//            var_dump($e->getMessage());exit;
//        }



        $data = [];
        $trackName = $manager->getTrackName();
        $data['track'] = $trackName;
        return $this->render(':develop:test.html.twig', $data);
    }

}
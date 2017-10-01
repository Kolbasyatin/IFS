<?php


namespace AppBundle\DataFixtures\ORM;


use AppBundle\Entity\Source;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadSourceData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $source1 = new Source();
        $source1
            ->setHumanId('mds_voice')
            ->setType('mpd')
            ->setIp('127.0.0.1')
            ->setPort(6600)
            ->setLogin('mpd_login')
            ->setPassword('mpd_password');

        $source2 = new Source();
        $source2
            ->setHumanId('mds_music')
            ->setType('mpd')
            ->setIp('127.0.0.1')
            ->setPort(6601)
            ->setLogin('mpd_login')
            ->setPassword('mpd_password');

        $manager->persist($source1);
        $manager->persist($source2);

        $manager->flush();

        $this->addReference('source1', $source1);
        $this->addReference('source2', $source2);
    }

    public function getOrder()
    {
        return 0;
    }

}
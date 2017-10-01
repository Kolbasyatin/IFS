<?php


namespace AppBundle\DataFixtures\ORM;


use AppBundle\Entity\Source;
use AppBundle\Entity\Stream;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class LoadStreamData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    public function load(ObjectManager $manager)
    {
        /** @var Source $source1 */
        $source1 = $this->getReference('source1');
        /** @var Source $source2 */
        $source2 = $this->getReference('source2');

        $stream1 = new Stream();
        $stream1
            ->setSource($source1)
            ->setName($this->translate('stream.voice'))
            ->setTitle($this->translate('stream.voice.title'))
            ->setUrl('http://ice.planeset.ru:8000/mds_voice.mp3');

        $stream2 = new Stream();
        $stream2
            ->setSource($source2)
            ->setName($this->translate('stream.music'))
            ->setTitle($this->translate('stream.music.title'))
            ->setUrl('http://ice.planeset.ru:8000/mds.mp3');

        $manager->persist($stream1);
        $manager->persist($stream2);

        $manager->flush();
    }

    public function getOrder()
    {
        return 10;
    }

    private function translate(string $id): string
    {
        $translator = $this->container->get('translator');

        return $translator->trans($id);
    }

}
<?php


namespace AppBundle\DataFixtures\ORM;


use AppBundle\Entity\User;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class LoadUserData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    public function load(ObjectManager $manager)
    {
        $superUser = new User();
        $superUser
            ->setUsername('admin')
            ->setEmail('no-reply@planeset.ru')
            ->setEnabled(true)
            ->addRole(USER::ROLE_SUPER_ADMIN)
        ;

        $plainPassword = 'admin';
        $encoded = $this->container->get('security.password_encoder')->encodePassword($superUser, $plainPassword);
        $superUser->setPassword($encoded);

        $manager->persist($superUser);
        $manager->flush();

        $this->setReference('user', $superUser);
    }

    public function getOrder()
    {
        return 0;
    }


}
<?php


namespace AppBundle\DataFixtures\ORM;


use AppBundle\Entity\Comment;
use AppBundle\Entity\User;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadCommentsData extends AbstractFixture implements OrderedFixtureInterface
{
    const COMMENTS = [
        [
            'type' => '',
            'text' => 'Этот коммент нигде не должен вылезти вообще'
        ],
        [
            'type' => Comment::TYPE_NEWS,
            'text' => 'Текст новости'
        ],
        [
            'type' => Comment::TYPE_COMMENT,
            'text' => 'Комментария текст'
        ]
    ];
    public function load(ObjectManager $manager)
    {
        /** @var User $user */
        $user = $this->getReference('user');
        $sources = [
            '',
            $this->getReference('source1'),
            $this->getReference('source2')
        ];

        foreach (range(1, 59) as $value) {
            $commentValue = self::COMMENTS[random_int(0, 2)];
            $source = $sources[random_int(0, 2)];
            $comment = new Comment();
            $comment
                ->setType($commentValue['type'])
                ->setText($commentValue['text'].$value)
                ->setOwnerUser($user);
            if ($source) {
                $comment->setTargetSource($source);
            }
            $manager->persist($comment);
        }

        $manager->flush();
    }

    public function getOrder()
    {
        return 20;
    }

}
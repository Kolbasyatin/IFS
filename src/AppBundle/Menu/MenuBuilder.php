<?php


namespace AppBundle\Menu;


use AppBundle\Entity\Stream;
use Doctrine\ORM\EntityManager;
use Knp\Menu\FactoryInterface;

class MenuBuilder
{
    /** @var  FactoryInterface */
    private $factory;
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * MenuBuilder constructor.
     * @param FactoryInterface $factory
     * @param EntityManager $entityManager
     */
    public function __construct(FactoryInterface $factory, EntityManager $entityManager)
    {
        $this->factory = $factory;
        $this->entityManager = $entityManager;
    }

    public function createMainMenu(array $options)
    {
        $menu = $this->factory->createItem('root', [
            'childrenAttributes' => [
                'id' => 'playerlist'
            ]
        ]);

        foreach ($this->getStreams() as $stream) {
            /** @var Stream $stream */
            $menu->addChild(
                $stream->getSource()->getHumanId(), [
                    'uri' => '#',
                    'label' => $stream->getName(),
                ]
            )
                ->setLinkAttributes([
                    'data-sourceId' => $stream->getSource()->getHumanId(),
                    'data-src' => $stream->getUrl(),
                    'title' => $stream->getTitle()
                ]);
        }
        return $menu;
    }

    private function getStreams(): iterable
    {
        return $this->entityManager->getRepository(Stream::class)->fetchAllEnabled();
    }


}
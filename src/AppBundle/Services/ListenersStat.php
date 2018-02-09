<?php


namespace AppBundle\Services;


use Doctrine\Common\Persistence\ObjectManager;

class ListenersStat
{

    /** @var ObjectManager */
    private $objectManager;

    /**
     * ListenersStat constructor.
     * @param ObjectManager $objectManager
     */
    public function __construct(ObjectManager $objectManager)
    {
        $this->objectManager = $objectManager;
    }


    public function doStat(array $listeners)
    {
        /** TODO: Implement stat of listeners */
    }
}
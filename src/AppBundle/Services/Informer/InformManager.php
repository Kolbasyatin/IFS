<?php


namespace AppBundle\Services\Informer;


use AppBundle\Lib\Informer\InformerException;

class InformManager
{
    /** @type InformerInterface[]
     * @throws InformerException
     */
    private $informers;

    public function __construct()
    {
        $this->informers = new \SplObjectStorage();
    }

    public function addInformer(InformerInterface $informer)
    {
        $this->informers->attach($informer);
    }


    public function getInformer(string $id): InformerInterface
    {
        foreach ($this->informers as $informer) {
            if ($informer->getId() === $id) {
                return $informer;

            }
        }
        throw new InformerException('No informer found');
    }

    public function getListeners(): array
    {
        $listeners = [];
        foreach ($this->informers as $informer) {
            $listeners[] = [
                'id' => $informer->getId(),
                'listeners' => $informer->getListeners(),
                'name' => $informer->getSourceName()
            ];
        }

        return $listeners;
    }
}
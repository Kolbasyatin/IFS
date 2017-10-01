<?php


namespace AppBundle\Repository;


use Doctrine\ORM\EntityRepository;

class BaseRepository extends EntityRepository
{
    public function fetchAllEnabled() {
        return $this->findBy(['isEnabled' => true]);
    }
}
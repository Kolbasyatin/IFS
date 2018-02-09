<?php


namespace AppBundle\Services\Informer;


interface DataProviderInterface
{
    public function getListeners(): ?int;

    public function getTrackName(): ?string;

    public function getSourceName(): ?string;

}
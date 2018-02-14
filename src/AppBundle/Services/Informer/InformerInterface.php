<?php


namespace AppBundle\Services\Informer;


interface InformerInterface
{
    public function getId(): ?string;

    public function getListeners(): ?int;

    public function getTrackName(): ?string;

    public function getSourceName(): ?string;

}
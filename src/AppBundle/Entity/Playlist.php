<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Playlist
 *
 * @ORM\Table(name="playlist")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PlaylistRepository")
 */
class Playlist extends Base
{
    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var Song[]
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Song")
     */
    private $songs;

    /**
     * @var Source
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Source")
     */
    private $source;

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Playlist
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set songs
     *
     * @param string $songs
     *
     * @return Playlist
     */
    public function setSongs($songs)
    {
        $this->songs = $songs;

        return $this;
    }

    /**
     * Get songs
     *
     * @return string
     */
    public function getSongs()
    {
        return $this->songs;
    }

    /**
     * @return Source
     */
    public function getSource(): Source
    {
        return $this->source;
    }

    /**
     * @param Source $source
     */
    public function setSource(Source $source)
    {
        $this->source = $source;
    }


}


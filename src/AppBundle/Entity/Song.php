<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Song
 *
 * @ORM\Table(name="song")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SongRepository")
 */
class Song extends Base
{


    /**
     * @var string
     *
     * @ORM\Column(name="hash", type="string", length=255, unique=true)
     */
    private $hash;

    /**
     * @var array
     *
     * @ORM\Column(name="tags", type="text_array", nullable=true)
     */
    private $tags;

    /**
     * @var SongRate[]
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\SongRate", mappedBy="song")
     */
    private $rates;

    /**
     * @var Comment[]
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Comment", mappedBy="targetSong")
     */
    private $comments;

    /**
     * Song constructor.
     */
    public function __construct()
    {
        $this->rates = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    /**
     * @return SongRate[]
     */
    public function getRates()
    {
        return $this->rates;
    }

    /**
     * @param SongRate $rate
     * @return Song
     */
    public function addRate(SongRate $rate): Song
    {
        $this->rates->add($rate);

        return $this;
    }

    /**
     * @return Comment[]
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * @param Comment $comment
     * @return Song
     */
    public function addComment(Comment $comment): Song
    {
        $this->comments->add($comment);

        return $this;
    }

    /**
     * Set hash
     *
     * @param string $hash
     *
     * @return Song
     */
    public function setHash(string $hash)
    {
        $this->hash = $hash;

        return $this;
    }

    /**
     * Get hash
     *
     * @return string
     */
    public function getHash(): ?string
    {
        return $this->hash;
    }

    /**
     * Set tags
     *
     * @param array $tags
     *
     * @return Song
     */
    public function setTags($tags)
    {
        $this->tags = $tags;

        return $this;
    }

    /**
     * Get tags
     *
     * @return array
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set rank
     *
     * @param string $rank
     *
     * @return Song
     */
    public function setRank($rank)
    {
        $this->rank = $rank;

        return $this;
    }

    /**
     * Get rank
     *
     * @return string
     */
    public function getRank()
    {
        return $this->rank;
    }
}


<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Source
 *
 * @ORM\Table(name="source")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SourceRepository")
 */
class Source extends Base
{

    /**
     * @var string
     *
     * @ORM\Column(name="humanId", type="string", length=32, unique=true)
     */
    private $humanId;

    /**
     * @var string
     *
     * @ORM\Column(name="ip", type="inet")
     */
    private $ip;

    /**
     * @var string
     *
     * @ORM\Column(name="login", type="string", length=255, nullable=true)
     */
    private $login;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=512, nullable=true)
     */
    private $password;

    /**
     * @var Stream[]
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Stream", mappedBy="source")
     *
     */
    private $streams;

    /**
     * @var string
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Comment", mappedBy="targetSource")
     */
    private $comments;

    /**
     * @var string
     *
     * @ORM\Column(name="playlists", type="string", length=255)
     */
    private $playlists;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;

    /**
     * Source constructor.
     */
    public function __construct()
    {
        $this->streams = new ArrayCollection();
    }


    /**
     * Set humanId
     *
     * @param string $humanId
     *
     * @return Source
     */
    public function setHumanId($humanId)
    {
        $this->humanId = $humanId;

        return $this;
    }

    /**
     * Get humanId
     *
     * @return string
     */
    public function getHumanId()
    {
        return $this->humanId;
    }

    /**
     * Set ip
     *
     * @param string $ip
     *
     * @return Source
     */
    public function setIp(string $ip)
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * Get ip
     *
     * @return string
     */
    public function getIp(): string
    {
        return $this->ip;
    }

    /**
     * Set login
     *
     * @param string $login
     *
     * @return Source
     */
    public function setLogin(string $login)
    {
        $this->login = $login;

        return $this;
    }

    /**
     * Get login
     *
     * @return string
     */
    public function getLogin(): ?string
    {
        return $this->login;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return Source
     */
    public function setPassword(string $password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    /**
     * Set streams
     *
     * @param Stream $streams
     * @return Source
     */
    public function addStreams(Stream $streams)
    {
        $this->streams = $streams;

        return $this;
    }

    /**
     * Get streams
     * @return ArrayCollection|null
     */
    public function getStreams(): ?ArrayCollection
    {
        return $this->streams;
    }

    /**
     * Set comments
     *
     * @param string $comments
     *
     * @return Source
     */
    public function setComments($comments)
    {
        $this->comments = $comments;

        return $this;
    }

    /**
     * Get comments
     *
     * @return string
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * Set playlists
     *
     * @param string $playlists
     *
     * @return Source
     */
    public function setPlaylists($playlists)
    {
        $this->playlists = $playlists;

        return $this;
    }

    /**
     * Get playlists
     *
     * @return string
     */
    public function getPlaylists()
    {
        return $this->playlists;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Source
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }
}


<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Source
 *
 * @ORM\Table(name="source")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SourceRepository")
 */
class Source extends Base
{
    const MPD_TYPE = 'mpd';
    /**
     * @var string
     *
     * @ORM\Column(name="humanId", type="string", length=32, unique=true)
     * @Assert\Type(type="string")
     * @Assert\NotNull()
     * @Assert\Length(min=1, max=32)
     */
    private $humanId;

    /**
     * MPD here?
     * @var string
     * @ORM\Column(name="ip", type="inet", nullable=true)
     * @Assert\Ip()
     */
    private $ip;

    /**
     * @var int
     * @ORM\Column(name="port", type="smallint", nullable=true)
     * @Assert\Type(type="integer")
     * @Assert\Length(min=1024, max=65536)
     */
    private $port;

    /**
     * @var string
     * @ORM\Column(name="login", type="string", length=255, nullable=true)
     * @Assert\Length(min=0, max=255)
     * @Assert\Type(type="string")
     */
    private $login;

    /**
     * @var string
     * @ORM\Column(name="password", type="string", length=512, nullable=true)
     * @Assert\Length(min=0, max=255)
     * @Assert\Type(type="string")
     */
    private $password;

    /**
     * @var Stream[]
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Stream", mappedBy="source")
     *
     */
    private $streams;

    /**
     * @var Comment[]
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Comment", mappedBy="targetSource")
     */
    private $comments;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     * @Assert\Choice(callback="getSourceTypes")
     * @Assert\Type(type="string")
     * @Assert\Length(max=255)
     */
    private $type;

    /**
     * Source constructor.
     */
    public function __construct()
    {
        $this->streams = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }


    /**
     * Set humanId
     *
     * @param string $humanId
     *
     * @return Source
     */
    public function setHumanId(string $humanId)
    {
        $this->humanId = $humanId;

        return $this;
    }

    /**
     * Get humanId
     *
     * @return string
     */
    public function getHumanId(): string
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
     * @param Stream $stream
     * @return Source
     */
    public function addStream(Stream $stream)
    {
        $this->streams->add($stream);

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
     * @param Comment $comment
     *
     * @return Source
     */
    public function addComment(Comment $comment)
    {
        $this->comments->add($comment);

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
     * Set type
     *
     * @param string $type
     *
     * @return Source
     */
    public function setType(string $type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @return int
     */
    public function getPort(): ?int
    {
        return $this->port;
    }

    /**
     * @param int $port
     * @return $this
     */
    public function setPort(int $port)
    {
        $this->port = $port;

        return $this;
    }



    public static function getSourceTypes(): array {
        return [static::MPD_TYPE];
    }
}


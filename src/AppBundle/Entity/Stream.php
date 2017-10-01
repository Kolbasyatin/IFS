<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Stream
 *
 * @ORM\Table(name="stream")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\StreamRepository")
 */
class Stream extends Base
{
    /** @var  Source
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Source", inversedBy="streams" )
     */
    private $source;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Assert\Type(type="string")
     * @Assert\Length(max=512)
     * @Assert\NotNull()
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Assert\Type(type="string")
     * @Assert\Length(max=512)
     * @Assert\NotNull()
     * @Assert\NotBlank()
     */
    protected $title;

    /**
     * @var int
     *
     * @ORM\Column(name="bitrate", type="smallint", nullable=true)
     */
    private $bitrate;

    /**
     * @var string
     *
     * @ORM\Column(name="stat", type="string", length=255, nullable=true)
     */
    private $stat;

    /**
     * @var string
     * @ORM\Column(name="url", type="string", length=512)
     * @Assert\Url()
     * @Assert\NotNull()
     * @Assert\NotBlank()
     */
    private $url;

    /**
     * @return Source
     */
    public function getSource(): Source
    {
        return $this->source;
    }

    /**
     * @param Source $source
     * @return Stream
     */
    public function setSource(Source $source): Stream
    {
        $this->source = $source;

        return $this;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Stream
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
     * Set bitrate
     *
     * @param integer $bitrate
     *
     * @return Stream
     */
    public function setBitrate($bitrate)
    {
        $this->bitrate = $bitrate;

        return $this;
    }

    /**
     * Get bitrate
     *
     * @return int
     */
    public function getBitrate()
    {
        return $this->bitrate;
    }

    /**
     * Set stat
     *
     * @param string $stat
     *
     * @return Stream
     */
    public function setStat($stat)
    {
        $this->stat = $stat;

        return $this;
    }

    /**
     * Get stat
     *
     * @return string
     */
    public function getStat()
    {
        return $this->stat;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return Stream
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return Stream
     */
    public function setTitle(string $title): Stream
    {
        $this->title = $title;
        return $this;
    }


}


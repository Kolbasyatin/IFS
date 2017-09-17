<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SongRate
 *
 * @ORM\Table(name="song_rate")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SongRateRepository")
 */
class SongRate
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="ownerUser", type="string", length=255)
     */
    private $ownerUser;

    /**
     * @var int
     *
     * @ORM\Column(name="sign", type="integer", nullable=true)
     */
    private $sign;

    private $value;

    private $song;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set ownerUser
     *
     * @param string $ownerUser
     *
     * @return SongRate
     */
    public function setOwnerUser($ownerUser)
    {
        $this->ownerUser = $ownerUser;

        return $this;
    }

    /**
     * Get ownerUser
     *
     * @return string
     */
    public function getOwnerUser()
    {
        return $this->ownerUser;
    }

    /**
     * Set sign
     *
     * @param integer $sign
     *
     * @return SongRate
     */
    public function setSign($sign)
    {
        $this->sign = $sign;

        return $this;
    }

    /**
     * Get sign
     *
     * @return int
     */
    public function getSign()
    {
        return $this->sign;
    }
}


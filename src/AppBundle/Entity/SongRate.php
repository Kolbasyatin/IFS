<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SongRate
 *
 * @ORM\Table(name="song_rate")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SongRateRepository")
 */
class SongRate extends Base
{
    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     *
     */
    private $ownerUser;

    /**
     * @var int
     *
     * @ORM\Column(name="sign", type="integer", nullable=true)
     */
    private $sign;

    /**
     * @var integer
     * @ORM\Column(name="value", type="smallint", nullable=true)
     */
    private $value;

    /**
     * @var Song
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Song", inversedBy="rates")
     */
    private $song;

    /**
     * Set ownerUser
     *
     * @param User $ownerUser
     * @return SongRate
     */
    public function setOwnerUser(User $ownerUser)
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
    public function setSign(int $sign)
    {
        $this->sign = $sign;

        return $this;
    }

    /**
     * Get sign
     *
     * @return int
     */
    public function getSign(): ?int
    {
        return $this->sign;
    }

    /**
     * @return int
     */
    public function getValue(): ?int
    {
        return $this->value;
    }

    /**
     * @param int $value
     * @return SongRate
     */
    public function setValue(int $value): SongRate
    {
        $this->value = $value;
        return $this;
    }

    /**
     * @return Song
     */
    public function getSong(): Song
    {
        return $this->song;
    }

    /**
     * @param Song $song
     * @return SongRate
     */
    public function setSong(Song $song): SongRate
    {
        $this->song = $song;

        return $this;
    }



}


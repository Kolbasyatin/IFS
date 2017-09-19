<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserRate
 *
 * @ORM\Table(name="user_rate")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRateRepository")
 */
class UserRate extends Base
{

    /**
     * @var string
     *
     * @ORM\Column(name="ownerUser", type="string", length=255)
     */
    private $ownerUser;

    /**
     * @var string
     *
     * @ORM\Column(name="trgetUser", type="string", length=255)
     */
    private $trgetUser;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="string", length=255, nullable=true)
     */
    private $text;

    /**
     * @var int
     *
     * @ORM\Column(name="rank", type="integer", nullable=true)
     */
    private $rank;

    /**
     * Set ownerUser
     *
     * @param string $ownerUser
     *
     * @return UserRate
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
     * Set trgetUser
     *
     * @param string $trgetUser
     *
     * @return UserRate
     */
    public function setTrgetUser($trgetUser)
    {
        $this->trgetUser = $trgetUser;

        return $this;
    }

    /**
     * Get trgetUser
     *
     * @return string
     */
    public function getTrgetUser()
    {
        return $this->trgetUser;
    }

    /**
     * Set text
     *
     * @param string $text
     *
     * @return UserRate
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get text
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set rank
     *
     * @param integer $rank
     *
     * @return UserRate
     */
    public function setRank($rank)
    {
        $this->rank = $rank;

        return $this;
    }

    /**
     * Get rank
     *
     * @return int
     */
    public function getRank()
    {
        return $this->rank;
    }
}


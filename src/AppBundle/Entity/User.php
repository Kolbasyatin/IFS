<?php


namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * Class User
 * @package AppBundle\Entity
 * @ORM\Entity
 * @ORM\Table(name="`user`")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var Comment[]
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Comment", mappedBy="ownerUser")
     */
    protected $comments;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @ORM\Column(type="string", name="vkontakte_id", length=255, nullable=true)
     */
    protected $vkontakte_id;


    /**
     * @ORM\Column(type="string", name="vkontakte_access_token", length=255, nullable=true)
     */
    protected $vkontakteAccessToken;

    /**
     * @return mixed
     */
    public function getVkontakteId()
    {
        return $this->vkontakte_id;
    }


    public function setVkontakteId($vkontakteId)
    {
        $this->vkontakte_id = $vkontakteId;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getVkontakteAccessToken()
    {
        return $this->vkontakteAccessToken;
    }

    /**
     * @param mixed $vkontakteAccessToken
     * @return User
     */
    public function setVkontakteAccessToken($vkontakteAccessToken)
    {
        $this->vkontakteAccessToken = $vkontakteAccessToken;

        return $this;
    }




}
<?php


namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Comment
 * @package AppBundle\Entity
 * @ORM\Table(name="Comments")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CommentRepository")
 */
class Comment extends Base
{

    const TYPES = [
        'comment',
        'news'
    ];
    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="comments")
     */
    private $ownerUser;

    /**
     * @var
     */
    private $targetSource;

    /**
     * @var
     */
    private $targetSong;

    /** @var  string
     * @ORM\Column(type="string", name="type", length=128, nullable=false)
     * @Assert\Choice(callback="getTypes")
     */
    private $type = 'comment';

    /**
     * @var string
     * @ORM\Column(name="text", type="text")
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @Assert\Length(
     *     min=2,
     *     max=255,
     *     minMessage="assert.comment.min.message",
     *     maxMessage="assert.comment.max.message"
     * )
     */

    private $text;

    /**
     * @var string
     * @ORM\Column(type="inet", nullable=true)
     * @Assert\Ip()
     */
    private $ip;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     * @Assert\Range(
     *     min=-1000,
     *     max=3000
     * )
     * @Assert\NotNull()
     * @Assert\NotBlank()
     */
    private $rate = 0;

    /**
     * @return User
     */
    public function getOwnerUser(): User
    {
        return $this->ownerUser;
    }

    /**
     * @param User $ownerUser
     * @return Comment
     */
    public function setOwnerUser(User $ownerUser): Comment
    {
        $this->ownerUser = $ownerUser;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getTargetSource()
    {
        return $this->targetSource;
    }

    /**
     * @param mixed $targetSource
     * @return Comment
     */
    public function setTargetSource($targetSource)
    {
        $this->targetSource = $targetSource;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getTargetSong()
    {
        return $this->targetSong;
    }

    /**
     * @param mixed $targetSong
     * @return Comment
     */
    public function setTargetSong($targetSong)
    {
        $this->targetSong = $targetSong;

        return $this;
    }

    /**
     * @return string
     */
    public function getText(): ?string
    {
        return $this->text;
    }

    /**
     * @param string $text
     * @return Comment
     */
    public function setText(string $text): Comment
    {
        $this->text = $text;

        return $this;
    }

    /**
     * @return string
     */
    public function getIp(): ?string
    {
        return $this->ip;
    }

    /**
     * @param string $ip
     * @return Comment
     */
    public function setIp(string $ip): Comment
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * @return int
     */
    public function getRate(): int
    {
        return $this->rate;
    }

    /**
     * @param int $rate
     * @return Comment
     */
    public function setRate(int $rate): Comment
    {
        $this->rate = $rate;

        return $this;
    }

    public static function getTypes() {
        return static::TYPES;
    }



}
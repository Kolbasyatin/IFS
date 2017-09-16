<?php


namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Blameable\Traits\Blameable;
use Gedmo\SoftDeleteable\Traits\SoftDeleteable;
use Gedmo\Timestampable\Traits\Timestampable;

/**
 * Class Base
 * @package AppBundle\Entity
 * @ORM\MappedSuperclass(repositoryClass="BaseRepository")
 *
 */
class Base
{
    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(name="title", type="string", length=255)
     *
     */

    protected $title;

    /**
     * @var bool
     * @ORM\Column(name="isEnabled", type="boolean")
     */
    protected $isEnabled = true;

    use SoftDeleteable;
    use Timestampable;
    use Blameable;

}
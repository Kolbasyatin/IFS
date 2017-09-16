<?php


namespace AppBundle\Entity;


use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Tools\Pagination\Paginator;

class CommentRepository extends BaseRepository
{
    const COMMENTS_PER_PAGE = 3;

    /**
     * Returns last comment
     * @return null|object|Comment
     */
    public function getLastComment()
    {
        return $this->findOneBy([], ['id' => 'DESC']);
    }

    /**
     * Returns first Comment
     * @return null|object|Comment
     */
    public function getFirstComment()
    {
        return $this->findOneBy([]);
    }

    /**
     * Get Comment by id
     * @param int $id
     * @return null|object|Comment
     */
    public function getCommentById(int $id)
    {
        return $this->find($id);
    }

    /**
     * Get comments by user id
     * @param int $userId
     * @return User[]
     */
    public function getCommentsByUserId(int $userId)
    {
        $user = $this->getEntityManager()->getRepository(User::class)->find($userId);

        return $this->findBy(['user' => $user]);
    }

    /**
     * Get the comments newer given comment id
     * @param int $lastCommentId
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCommentsNewerId(int $lastCommentId)
    {
        $criteria = new Criteria();
        $criteria->where($criteria::expr()->gt('id', $lastCommentId));

        return $this->matching($criteria);
    }

    /**
     * Return comments from page id
     * @param int $page
     * @return Comment[]
     */
    public function getCommentsPage(int $page)
    {
        $comments = [];
        if ($page <= $this->getPagesCount()) {
            $limit = self::COMMENTS_PER_PAGE;
            $offset = $page * $limit;
            $comments = $this->findBy([], [], $limit, $offset);
        }

        return $comments;
    }

    /**
     * Get count pages of comments
     * @return int
     */
    public function getPagesCount()
    {
        $query = $this->createQueryBuilder('s');
        $paginator = new Paginator($query);
        $count = $paginator->count();
        $pages = (int) ceil($count / $this::COMMENTS_PER_PAGE);

        return $pages;
    }


}
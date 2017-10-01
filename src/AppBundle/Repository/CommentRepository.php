<?php


namespace AppBundle\Repository;


use AppBundle\Entity\Comment;
use AppBundle\Entity\User;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;

class CommentRepository extends BaseRepository
{
    const COMMENTS_PER_PAGE = 5;

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
     * TODO: Метод не рабочий. Надо подумать как добавить смещение на случай появления новых комментов ведь тогда количество страниц становится другим.
     * @param int $lastCommentId
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCommentsNewerId(string $source, int $lastCommentId)
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
    public function getDirectOrderPageCommentBySource(string $source, int $page)
    {
        return $this->getPageCommentBySource($source, $page, 'ASC');
    }

    public function getReversePageCommentBySource(string $source, int $page)
    {
        return $this->getPageCommentBySource($source, $page, 'DESC');
    }

    private function getPageCommentBySource(string $source, int $page, string $sort)
    {
        $comments = [];
        if ($page <= $this->getPagesCount()) {
            $limit = self::COMMENTS_PER_PAGE;
            $offset = ($page - 1) * $limit;

            $qb = $this->createQueryBuilder('comment');
            /** Тут магия. Выдаем новости если пустой source, но тип комментария news */
            $qb = $source ? $this->createCommentsQueryBuilder($qb, $source) : $this->createNewsQueryBuilder($qb);
            $qb
                ->addOrderBy('comment.createdAt', $sort)
                ->addOrderBy('comment.id', $sort)
                ->setFirstResult($offset)
                ->setMaxResults($limit);
            $comments = $qb->getQuery()->getResult();
        }

        return $comments;
    }

    private function createCommentsQueryBuilder(QueryBuilder $qb, string $source): QueryBuilder
    {
        return $qb
            ->innerJoin('comment.targetSource', 'source')
            ->where('source.humanId = :sourceId')
            ->andWhere('comment.type = :type')
            ->setParameters([
                'sourceId'=> $source,
                'type' => Comment::TYPE_COMMENT
            ]);
    }

    private function createNewsQueryBuilder(QueryBuilder $qb): QueryBuilder
    {
        return $qb
            ->where('comment.type = :type')
            ->setParameter('type', Comment::TYPE_NEWS);
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
        $pages = (int)ceil($count / $this::COMMENTS_PER_PAGE);

        return $pages;
    }


}
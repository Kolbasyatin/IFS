<?php


namespace AppBundle\Command;


use Doctrine\ORM\EntityManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Stopwatch\Stopwatch;

class DBRecreateCommand extends Command
{
    /** @var  EntityManager */
    private $em;

    public function __construct($name = null, EntityManager $entityManager)
    {
        parent::__construct($name);
        $this->em = $entityManager;

    }

    protected function configure()
    {
        $this->setName('ifs:db:recreate');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $stopwatch = new Stopwatch();
        $stopwatch->start('dbRenew');

        $application = $this->getApplication();
        $dropScheme = $application->find('doctrine:schema:drop');
        $dropScheme->run(new ArrayInput(['--force' => true]), $output);

        $createScheme = $application->find('doctrine:schema:create');
        $createScheme->run(new ArrayInput([]), $output);

        $this->em->getConnection()->exec($this->getSessionSql());

        $fixtures = $application->find('doctrine:fixtures:load');
        $fixtures->run(new ArrayInput([]), $output);

        $time = $stopwatch->stop('dbRenew')->getDuration();

        $output->writeln(sprintf('Complete. Elapsed time: %s', date('i:s', $time/1000)));
    }

    private function getSessionSql()
    {
        return <<<SESSION_TABLE
CREATE TABLE IF NOT EXISTS sessions (
    sess_id VARCHAR(128) NOT NULL PRIMARY KEY,
    sess_data BYTEA NOT NULL,
    sess_time INTEGER NOT NULL,
    sess_lifetime INTEGER NOT NULL
);

SESSION_TABLE;
    }
}
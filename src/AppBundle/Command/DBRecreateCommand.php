<?php


namespace AppBundle\Command;


use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class DBRecreateCommand extends Command
{
    protected function configure()
    {
        $this->setName('ifs:db:recreate');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $command = $this->getApplication()->find('ifs:test');
        $command->execute(new ArrayInput(['arg']), $output);
//        $command->execute(new ArrayInput(['command' => 'cache:warmup']), $output);
    }




}
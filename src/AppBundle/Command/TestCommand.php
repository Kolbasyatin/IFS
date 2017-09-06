<?php


namespace AppBundle\Command;


use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class TestCommand extends Command
{
    protected function configure()
    {
        $this->setName('ifs:test');
        $this->addArgument('arg', InputArgument::OPTIONAL, 'arg');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $test = $input->hasArgument('arg') ? $input->getArgument('arg') : 'noarg';
        $output->writeln('Alloha!'.$test);
    }


}
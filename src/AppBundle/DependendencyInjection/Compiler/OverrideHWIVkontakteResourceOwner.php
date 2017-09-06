<?php


namespace AppBundle\DependendencyInjection\Compiler;


use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use AppBundle\Lib\VkontakteResourceOwner as FixedVkontakteResourceOwner;

/**
 * @link https://github.com/hwi/HWIOAuthBundle/pull/1255
 * Class OverrideHWIVkontakteResourceOwner
 * @package AppBundle\DependendencyInjection\Compiler
 */
class OverrideHWIVkontakteResourceOwner implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $definition = $container->getDefinition('hwi_oauth.resource_owner.vkontakte');
        $definition->setClass(FixedVkontakteResourceOwner::class);
    }

}
<?php


namespace AppBundle\Form;


use AppBundle\Entity\Comment;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CommentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $type = $builder->getData()->getType();
        $builder
            ->add('text', TextareaType::class, [
                'label' => $type.'.message',
                'label_attr' => [
                    'class' => 'comment_block_title'
                ],
                'attr' => [
                    'class' => 'text ui-widget-content ui-corner-all',
                ]
            ])

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Comment::class,

        ]);
    }

    public function getBlockPrefix()
    {
        return 'comment_form';
    }


}
<?php

namespace App\Form;

use App\Entity\Survey;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SurveyType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('formData')
            ->add('isPublic', null, [
                'required' => false
            ])
            ->add('isPublished')
        ;

        $builder->get('formData')
            ->addModelTransformer(new CallbackTransformer(
                function ($dataAsArray) {
                    return json_encode($dataAsArray, JSON_UNESCAPED_SLASHES+ JSON_PRETTY_PRINT);
                },
                function ($dataAsJsonString) {
                    // transform the string back to an array
                    return $dataAsJsonString ? json_decode($dataAsJsonString) : null;
                }
            ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Survey::class,
        ]);
    }
}

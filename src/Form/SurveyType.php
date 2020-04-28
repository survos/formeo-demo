<?php

namespace App\Form;

use App\Entity\Survey;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SurveyType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $includeFormJson = $options['include_form_json'];
        $builder
            ->add('name')
            ->add('isPublic', CheckboxType::class, [
                'required' => false,
                'help' => "When published, show on public list.  Otherwise, the survey will be unlisted, only users with the URL will be able to access it."
            ])
            ->add('isPublished', CheckboxType::class, [
                'required' => false,
                'help' => "Response Data is not saved until the survey is published"
            ]) // this really should be set in workflow!
        ;
        if ($includeFormJson) {
            $builder
                ->add('formData');
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

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Survey::class,
            'include_form_json' => false
        ]);
    }
}

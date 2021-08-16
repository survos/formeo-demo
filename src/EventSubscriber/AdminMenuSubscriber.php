<?php

namespace App\EventSubscriber;

use App\Entity\Survey;
use App\Repository\SurveyRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use KevinPapst\AdminLTEBundle\Event\KnpMenuEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\RouterInterface;

class AdminMenuSubscriber implements EventSubscriberInterface
{
    /**
     * @var RouterInterface
     */
    private $router;
    /**
     * @var SurveyRepository
     */
    private $surveyRepository;
    /**
     * @var RequestStack
     */
    private $requestStack;

    public function __construct(RequestStack $requestStack, RouterInterface $router, SurveyRepository $surveyRepository)
    {
        $this->router = $router;
        $this->surveyRepository = $surveyRepository;
        $this->requestStack = $requestStack;
    }

    public function onKnpMenuEvent(KnpMenuEvent $event)
    {

        $menu = $event->getMenu();
        $childOptions = $event->getChildOptions();

        $menu->addChild(
            'menu-label',
            ['label' => 'Main Navigation', 'childOptions' => $childOptions]
        )->setAttribute('class', 'header');


        $publicMenu = $menu->addChild('public', [
            'childOptions' => $childOptions,
        ]);
        $publicMenu->addChild('public_surveys',
            [
                'childOptions' => $childOptions,
                'route' => 'app'])
            ->setAttribute('icon', 'fas fa-home');

        $publicMenu->addChild('survos_landing', [
            'childOptions' => $childOptions,
            'route' => 'app'])
            ->setAttribute('icon', 'fas fa-home');

        // collection menus
        $surveyCollectionMenu = $menu->addChild('survey.menu', [
            'childOptions' => $childOptions,
        ]);
        $surveyCollectionMenu->addChild('survey.new', ['route' => 'survey_new']);
        $surveyCollectionMenu->addChild('survey_dashboard',
            [
                // 'label' => 'survey_index',
                'route' => 'survey_dashboard'])->setAttribute('icon', 'fas fa-home');
// $menu->addChild('survey_new', ['route' => 'survey_new'])->setAttribute('icon', 'fas fa-home');

        $request = $this->requestStack->getCurrentRequest();

        /** @var Survey $survey */
        if ($survey = $request->get('survey')) {
            $menu->addChild(
                'survey-menu-header',
                ['label' => 'Survey: ' . $survey->getName(), 'childOptions' => $childOptions]
            )->setAttribute('class', 'header');

            foreach (['show', 'edit', 'designer'] as $route) {
                $menu->addChild($route, ['route' => 'survey_' . $route,
                    'routeParameters' => ['id' => $survey->getId()]]);
            }
        }


    }

    public static function getSubscribedEvents()
    {
        return [
            KnpMenuEvent::class => 'onKnpMenuEvent',
        ];
    }
}

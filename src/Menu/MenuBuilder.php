<?php // generated by @SurvosLanding/MenuBuilder.php.twig

namespace App\Menu;

use Survos\LandingBundle\Menu\LandingMenuBuilder;

class MenuBuilder extends LandingMenuBuilder
{

    public function createMainMenu(array $options)
    {
        $menu = $this->factory->createItem('root');

$menu->setChildrenAttribute('class', 'nav navbar-nav mr-auto');

$menu->addChild('app_build_form', ['route' => 'app_build_form'])->setAttribute('icon', 'fas fa-home');
$menu->addChild('api_entrypoint', ['route' => 'api_entrypoint'])->setAttribute('icon', 'fas fa-home');

$menu->addChild('survey_index', ['route' => 'survey_index'])->setAttribute('icon', 'fas fa-home');
$menu->addChild('survey_new', ['route' => 'survey_new'])->setAttribute('icon', 'fas fa-home');

$menu->addChild('survos_landing', ['route' => 'app_homepage'])->setAttribute('icon', 'fas fa-home');

$menu->addChild('survos_landing_credits', ['route' => 'survos_landing_credits'])->setAttribute('icon', 'fas fa-trophy');
$menu->addChild('app_typography', ['route' => 'app_typography'])->setAttribute('icon', 'fab fa-bootstrap');

try {
} catch (\Exception $e) {
    // probably not loaded.
}


// $menu->addChild('admin', ['route' => 'easyadmin']);

// ... add more children

return $this->cleanupMenu($menu);
}



}
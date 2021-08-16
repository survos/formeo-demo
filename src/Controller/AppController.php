<?php

namespace App\Controller;

use App\Repository\SurveyRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/app", name="app")
     */
    public function index()
    {
        return $this->render('app/index.html.twig', [
            'controller_name' => 'AppController',
        ]);
    }

    /**
     * @Route("/", name="survey_index", methods={"GET"})
     */
    public function publicList(SurveyRepository $surveyRepository): Response
    {
        return $this->render('survey/index.html.twig', [
            'surveys' => $surveyRepository->findBy(['isPublic' => true, 'isPublished' => true]),
        ]);
    }

    /**
     * @Route("/build", name="app_build_form")
     */
    public function buildForm()
    {
        return $this->render('app/builder.html.twig', [
        ]);
    }

}

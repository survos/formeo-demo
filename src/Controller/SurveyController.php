<?php

namespace App\Controller;

use App\Entity\Survey;
use App\Form\SurveyType;
use App\Repository\SurveyRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/survey")
 */
class SurveyController extends AbstractController
{
    /**
     * @Route("/", name="survey_list", methods={"GET"})
     */
    public function index(SurveyRepository $surveyRepository): Response
    {
        return $this->render('survey/index.html.twig', [
            'surveys' => $surveyRepository->findBy([]),
        ]);
    }

    /**
     * @Route("/dashboard", name="survey_dashboard", methods={"GET"}, options={"showSurveyMenu": true})
     * @IsGranted("ROLE_USER")
     */
    public function dashboard(SurveyRepository $surveyRepository): Response
    {
        $user = $this->getUser();
        return $this->render('survey/dashboard.html.twig', [
            'surveys' => $user->getSurveys()
        ]);
    }

    /**
     * @Route("/new", name="survey_new", methods={"GET","POST"})
     * @IsGranted("ROLE_USER")
     */
    public function new(Request $request): Response
    {
        $survey = (new Survey())
            ->setDesignerType(Survey::DESIGNER_TYPE_FORMBUILDER)
            ->setOwner($this->getUser());

        $form = $this->createForm(SurveyType::class, $survey);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($survey);
            $entityManager->flush();

            return $this->redirectToRoute('survey_designer', $survey->getRP());
        }

        return $this->render('survey/new.html.twig', [
            'survey' => $survey,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="survey_show", methods={"GET"})
     * @IsGranted("ROLE_USER")
     */
    public function show(Survey $survey): Response
    {
        return $this->render('survey/show.html.twig', [
            'survey' => $survey,
        ]);
    }

    /**
     * @Route("/design/{id}", name="survey_designer", methods={"GET"})
     */
    public function design(Survey $survey): Response
    {
        return $this->render('survey/designer.html.twig', [
            'survey' => $survey,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="survey_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Survey $survey): Response
    {
        $form = $this->createForm(SurveyType::class, $survey);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('survey_index');
        }

        return $this->render('survey/edit.html.twig', [
            'survey' => $survey,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="survey_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Survey $survey): Response
    {
        if ($this->isCsrfTokenValid('delete'.$survey->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($survey);
            $entityManager->flush();
        }

        return $this->redirectToRoute('survey_index');
    }
}

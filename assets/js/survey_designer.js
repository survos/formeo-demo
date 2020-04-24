'use strict';

const $ = require('jquery');
window.jQuery=$;

require('formeo'); // do we need this here?

import {FormeoManager} from './Components/FormeoManager';
import('formeo/dist/formeo.min.css');

const Routing = global.Routing;
const renderer = new FormeoRenderer({ renderContainer: '#rendered-form'})

let $designerElement = $('#survey-editor');
let surveyId =  $designerElement.data('surveyId');
console.log("Survey " + surveyId);

const manager = new FormeoManager(
    $designerElement,
    {
        fetchUrl: Routing.generate('api_surveys_get_item', {id: surveyId}),
        patchUrl: Routing.generate('api_surveys_patch_item', {id: surveyId}),
        formDataField: 'formData'
    }
    );

// load the editor.
manager.loadFromApi( (formData) => {
    console.log('about to render!', formData);

    manager.renderBuilder();
    // renderer.render(manager.formData);
    // renderer.render(formData);
});

$('#previewBtn').click( function() {
    console.log(manager.getBuilderData());
    renderer.render(manager.getBuilderData());
});

$('#saveResponsesBtn').click( function(e) {
    e.stopPropagation();
    console.log(renderer);
    console.log( $('#test_form').serializeArray());
    var values = {};
    $.each($('#test_form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);
});

// manager.renderBuilder();
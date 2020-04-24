'use strict';

const $ = require('jquery');
window.jQuery=$;

require('formeo'); // do we need this here?

import {FormeoManager} from './Components/FormeoManager';
import('formeo/dist/formeo.min.css');

const Routing = global.Routing;

const renderer = new FormeoRenderer({ renderContainer: '#rendered-form'})

let $formElement = $('#survey-form');
let surveyId =  $formElement.data('surveyId');
const manager = new  FormeoManager(
    null, // no designer
    {
        fetchUrl: Routing.generate('api_surveys_get_item', {id: surveyId}),
        patchUrl: Routing.generate('api_surveys_patch_item', {id: surveyId}),
        formDataField: 'formData'
    }
    );

    // since we're not initializing editor in the manager (for testing)
    manager.loadFromApi( (formData) => {
        console.log('about to render!');
        renderer.render(formData);

    });

$('#saveResponsesBtn').click( function() {
    console.log(renderer);
    console.log( $formElement.serializeArray());
    var values = {};
    $('#response_data').html('');
    $.each($formElement.serializeArray(), function(i, field) {

        let formField = manager.getField(field.name);
        console.log(formField);
        let label = formField.config.label;
        $('#response_data').append(`<li> 
${label} 
<span class="text-muted text-sm" title="${field.name}"><b>${field.value}</b></span> </li>`);
        values[field.name] = field.value;

    });

    // POST the saved responses via API
    const saveResponsesUrl = Routing.generate('api_responses_post_collection');
    console.warn(JSON.stringify($formElement.serializeArray()));
    $.ajax({
        type: 'POST',
        url: saveResponsesUrl,
        contentType:  'application/json',
        dataType: 'json',
        data: JSON.stringify( {
            survey: Routing.generate('api_surveys_get_item', {id: surveyId}),
            data:  $formElement.serializeArray(),
        }),
    })
        .done (data => {
            //or your custom data either as object {foo: "bar", ...} or foo=bar&...
                console.warn($formElement.serializeArray());
                console.log('SAVED!', data);
            }
        )
        .fail( (data) => {
            console.error(data);
        } )
;
    console.log(values);
});

// manager.renderBuilder();
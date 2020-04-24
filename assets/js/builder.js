const $ = require('jquery');
console.log($);
require('formeo');
import('formeo/dist/formeo.min.css');

let $el = document.querySelector('#formeo-render');
const Routing = global.Routing;

let renderedForm = new FormeoRenderer({ renderContainer: $el});

function FormRender() { renderedForm.render(formeo.formData); }

var formeo = new FormeoEditor({
    debug:true,
    events: {
        onSave: function (data) {
            console.warn('onSave!!');
            console.log(data.formData, JSON.stringify(data.formData));

            renderedForm.render(data);
            // renderedForm.render(data);
        }
    },
    editorContainer: '#builder',
});

let surveyId = 1;
let fetchUrl =  Routing.generate('api_surveys_get_item', {id: surveyId});

$.ajax(fetchUrl, {})

$('#previewBtn').click( function() {
    console.log('rendering form', formeo.formData);
        renderedForm.render(formeo.formData);
    }
);

$('#saveBtn').click( function() {

        console.log('saving submitted form data', renderedForm.form.fields, JSON.stringify(renderedForm.form));
        let fields = renderedForm.form.fields;
        for (var key of Object.keys(fields)) {
            let field = fields[key];
            let fieldId = '#f-' + key;
            let f = $(fieldId);
            console.log(fieldId, field.config, field.attrs, f.val());
        }
    }
);





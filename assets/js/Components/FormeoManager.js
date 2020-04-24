const $ = require('jquery');
window.jQuery=$;

require('formeo');
/*
require("jquery-ui-sortable");
require("formBuilder");
require('formBuilder/dist/form-render.min.js');
console.log(' (FormeoManager.js');
*/
let contentTypes = {
    'PATCH': 'application/merge-patch+json',
    'POST': 'application/json',
    'GET': 'application/json'
};


export class FormeoManager
{
    constructor($element, options) {
        // should the element have a preview and designer and all the buttons?  Or create the buttons?

        // the designer element
        this.$element = $element;
        this.addListeners();
        this.apiRoute = false;
        this.apiFieldName = '';
        this.formData = false; // start off with no data loaded.

        // @todo: use $.extend?
        this.patchUrl = options.patchUrl || false;
        this.formDataField = options.formDataField || 'formData';
        this.fetchUrl = options.fetchUrl || false;

        /*
        this.editor = new FormeoEditor({
            editorContainer: $element
        });
        console.log('after new FormEditor call', this.getOptions());

         */


        // we could fetch the data first, then initialize it.
       // this.formeoEditor = new FormeoEditor(this.getOptions());

    }

    getFormData() {
        return this.formData;
    }

    getBuilderData() {
        return this.formeoEditor.formData;
    }

    getUserData() {
        return this.render().formData;
    }

    getField(key) {
        key = key.replace(/^f-/, ''); // fields begin with f-, could replace before the call
        let obj = this.formData.fields; // of course, formData needs to be set!
        console.log(obj, key);
        if (obj != null && hasOwnProperty.call(obj, key)) {
            return obj[key];
        } else {
            return false;
        }
    }

    setSave(route, fieldName) {
        this.apiRoute = route;
        this.apiFieldName = fieldName;
    }

    // this is an API Platform call
    loadFromApi(callback=false) {
        let url = this.fetchUrl; // options?  ApiConfig?
        let method = 'GET';
        let jsonData = {};
        console.warn('Fetching..', url);
        $.ajax(url, {
            data: JSON.stringify(jsonData),
            dataType: "json", // this is the RETURN data
            contentType: contentTypes[method],
            method: method
        }).done( (data) =>  {
            let formData = data[this.formDataField];
            this.formData = formData;

            if (callback) {
                callback(formData);
            } else {
                console.warn('API fetch okay, about to load formeoEditor');
                // hack!!  recreate
                // this.formeoEditor = new FormeoEditor(this.getOptions());
            }

            /* when we want to display it to the user
            const renderer = new FormeoRenderer(this.getOptions());
            renderer.render(formData);
             */

            // this.formeoEditor.load(formData, this.getOptions());
            // console.warn('editorloadLoad requested with data', data, formData);

        }).fail( (data) => {
            console.error(data);
        })
    }



    // this is an API Platform call
    saveToDatabase(data, callback=false) {
        let url = this.patchUrl; // options?  ApiConfig?
        let method = 'PATCH';
        let jsonData = {};
        // could also try var myObj = {[a]: b}; https://stackoverflow.com/questions/2241875/how-to-create-an-object-property-from-a-variable-value-in-javascript
        jsonData[this.formDataField] = data;
        console.warn(jsonData, JSON.stringify(jsonData));
        $.ajax(url, {
            data: JSON.stringify(jsonData),
            dataType: "json", // this is the RETURN data
            contentType: contentTypes[method],
            method: method
        }).done( (data) =>  {
            if (callback) {
                callback(data);
            }
            console.warn('API saved okay');
            console.log(data);

        }).fail( (data) => {
            console.error(data);
        })
    }

    render(userData) {

    }

    renderBuilder() {

        // console.log('loading editor with ', this.getOptions(), this.formData);
       // this.editor.load(this.formData); // , this.getOptions()); // reset options?
        // this.editor.load(this.formData, this.getOptions()); // reset options?
        let options = this.getOptions();
        console.log('editorContainer', options.editorContainer);
        this.formeoEditor = new FormeoEditor(this.getOptions(), this.formData);
        // this.formeoEditor.load(this.formData, this.getOptions());
        // this.formeoEditor.render();
        // this.formeoEditor.render();
        // console.log('recreated with', JSON.stringify(formData), this.getOptions());
        // console.log(this.formeoEditor.formData);

        return;

        let fields = [
            {
                label: 'Star Rating',
                attrs: {
                    type: 'starRating'
                },
                icon: '🌟'
            },
            {
                label: '2D',
                attrs: {
                    type: 'twod'
                },
                icon: '🌟'
            },
        ];
        let templates = {
            twod: function (fieldData) {
                return {
                    field: '<span id="' + fieldData.name + '">',
                    onRender: function (d) {
                        $(document.getElementById(fieldData.name)).html(JSON.stringify(fieldData));
                    }
                    // $(document.getElementById(fieldData.name)).rateYo({rating: 3.6});
                }

            },
            starRating: function (fieldData) {
                return {
                    field: '<span id="' + fieldData.name + '">',
                    onRender: function () {
                        // $(document.getElementById(fieldData.name)).rateYo({rating: 3.6});
                    }
                };
            }
        };

    }

    getOptions() {
        const controls  = {
            disable: {
                elements: ['file', 'hidden'],
                // groups: ['layout'],
                // formActions: true, // cancel and save buttons will not be shown
                // formActions: ['clearBtn'], // only the clear button will be disabled
            },
        }

        const events  = {
            onSave: (e) => {
                let data = e.formData;
                console.log(e);
                console.log(data);
                this.saveToDatabase(data);
                /*
                $('#fb-rendered-form').formRender({
                    fields,
                    templates,
                    formData: data
                });

                 */
                // make the API call to save this,
            }
        };

        return {
            debug:false,
            editorContainer: '#' + this.$element.attr('id'),
            events,
            controls}


    }
        /*
        var formeo = new FormeoEditor({
            debug:true,
            events: {
                onSave:  (data) => {
                    console.warn('onSave!!', data);
                    // console.log(data.formData, JSON.stringify(data.formData));
                    this.saveToDatabase(data);

                    // renderedForm.render(data);
                    // renderedForm.render(data);
                }
            },
            editorContainer: '#survey-editor'
        });
        console.log("FormeoEdition initializied, version " + formeo.version)
         */

        /*
        this.formBuilder = this.$element(options);
        this.formBuilder.actions.setLang('es-MX');
        this.formBuilder.actions.setLang('pt-BR');
        *

        Object.keys(window).forEach(key => {
            if (/(field|form)/.test(key)) {
                console.log(key);
                window.addEventListener(key.slice(2), event => {
                    // console.log(event);
                });
            }
        });

        this.formBuilder.actions.save = function(e, data)  {
            console.warn('onSave added later!', data);
        };
         */

        /*
        document.addEventListener('fieldAdded', this.dumpEvent);
        document.addEventListener('modalOpened', this.dumpEvent);
        document.addEventListener('modalClosed', this.dumpEvent);
        document.addEventListener('viewData', this.dumpEvent);
        document.addEventListener('fieldRendered', this.dumpEvent);
        document.addEventListener('fieldEditOpened', this.dumpEvent);
        document.addEventListener('fieldEditClosed', this.dumpEvent);
         */

        /*
        document.addEventListener('fieldAdded', (e) => {
            // get the formData and find the new field.
            this.formData = this.formBuilder.actions.getData();

            // get the index of the new element
            const regex = /\d$/;
            let newElementIndex = this.formData.findIndex( function (element) { console.log(element.name); return regex.test(element.name); } );
            if (newElementIndex !== -1) {
                let name = prompt('Field Name');
                this.formData[newElementIndex].name = name;
                this.formData[newElementIndex].label = name;
                console.log(this.formData[newElementIndex]);
                this.formBuilder.actions.setData(this.formData);
            }

            console.error(newElementIndex);

            let newElement = this.formData[newElementIndex];
        });
         */

    dumpEvent(e) {
        console.log(e, e.target);
    }

    preview($previewElement) {
        let renderedForm =  $previewElement.formRender({
            formData: jsonData
        });
        // we could add a save and do a popup

    }

    addListeners() {
        // based on class?
        if (0)
            $('#fb-editor').formBuilder({
                formData: jsonData,
                onSave: (e, data) => {
                    console.log(JSON.parse(data));
                    // make the API call to save this,
                }
            });

    }


}
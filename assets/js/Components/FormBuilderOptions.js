// this was used for FormBuilder, but isn't valid for FormeoEditor

function getOptions() {
    // fb.actions.setLang(lang)
    console.log();
    let options = {
        editorContainer: '#' + this.$element.attr('id'), // hackish, maybe there's a way to pass the element itself.
        // fields,
        // templates,
        // lang: 'es-MX',
        // formData: this.formData,
        dataType: 'json',
        editOnAdd: true,
        // disabledActionButtons: ['data'],
        disableFields: ['autocomplete', 'file', 'hidden', 'button'],
        scrollToFieldOnAdd: false,
        onAddField: function (fieldId, data) {
            const currentFieldId = fieldId;
            // console.log(fieldId, data);
            data.name = '';
            // data.label = 'x';
            return data;
        },
        onOpenFieldEdit: function (editPanel) {
            let $el = $(editPanel);
            console.log('a field edit panel was opened', $el, $el.attr('id'), $el.data('fieldId'));
            let $field = $el.find('.fld-label');
            console.log($field);
            // $field.attr('type', 'text'); // .attr('value', '').html('');
            // $field.html('New field');
            $field.css({
                background: "yellow",
                border: "3px red solid"
            });
            $field.attr('placeholder', 'Field Name').focus().select();
            $field.prop('required', true);
        },
        events: {
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
        },
        controlOrder: [
            'header',
            'paragraph',
            'autocomplete',
            'button',
            'checkbox-group',
            'checkbox',
            'date',
            'file',
            'hidden',
            'number',
            'radio-group',
            'select',
            'text',
            'textarea',
        ],
        typeUserAttrs: {
            date: {
                min: {
                    label: 'Date min.',
                    maxlength: '10',
                    description: 'Minimum'
                },
                max: {
                    label: 'Date max.',
                    maxlength: '10',
                    onclick: 'alert("wooohoooo")',
                    placeholder: 'yeah "sure" whateverman'
                }
            },
            text: {
                units: {
                    label: 'Units',
                    options: {
                        '': '',
                        'red form-control': 'cm',
                        'green form-control': 'inches',
                        'pesos': 'pesos',
                        'dollars': 'dollars'
                    },
                    style: 'border: 1px solid red'
                },
                pattern: {
                    label: 'Pattern',
                    description: 'Enter a RegExp passwords must match', // this is the on-hover text
                    value: '',
                    style: 'border: 1px solid green'
                }
            }
        },
        txxypeUserAttrs: {
            text: {
                pattern: {
                    label: 'Pattern',
                    description: 'Enter a RegExp passwords must match'
                }
            }
        },
        typeUserEvents: {
            xxtext: {
                onadd: function (fld) {
                    var name = prompt('Field name');
                    console.log(fld);
                    var $patternField = $('.fld-pattern', fld);
                    $patternField.prop('disabled', true).parent().hide();
                    $('.fld-subtype', fld)
                        .change(function (e) {
                            var toggle = (e.target.value === 'password');
                            $patternField.prop('disabled', !toggle).parent().toggle(toggle);
                        });
                }
            }
        },

    };

    /*

    let fields = [{
        label: 'Star Rating',
        attrs: {
            type: 'starRating'
        },
        icon: '🌟'
    }];
    let templates = {
        starRating: function(fieldData) {
            return {
                field: '<span id="'+fieldData.name+'">',
                onRender: function() {
                    $(document.getElementById(fieldData.name)).rateYo({rating: 3.6});
                }
            };
        }
    };
    console.log({fields, templates});

     */


    // this.$element.formBuilder({ fields, templates });

    if (0)
        this.formBuilder = this.$element.formBuilder({
            formData: this.formData,
            onSave: (e, data) => {
                console.log(JSON.parse(data));
                // make the API call to save this,
            }
        });

    return options;
}

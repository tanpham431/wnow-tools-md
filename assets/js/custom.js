$(document).ready(function() {
    //init all material design for all effect
    var global_xmlDOC = '';
    UI.init();

    //show/hide expand other fields area
    $('#expand-other-fields-btn').click(function() {
        UI.toggleMoreFieldsArea();
    });

    /* catch when user Cancel choose file*/
    document.body.onfocus = function() {
        var godzilla = document.getElementById('file');
        if (godzilla.value.length) {} else {
            UI.hideLoading();
        }
        document.body.onfocus = null;
    }

    //click choose file
    $("input#file").change(function(object) {
        FILE.getFileContent(object);
    });


    $('#field-story-select').change(function() {
        listRealStory = []; // reset list story
        errorList = [];
        var nodeName = $('#field-story-select').val();
        if (nodeName.indexOf('[') > 0) {
            var attributeName = nodeName.substring(12, nodeName.length - 1);
            var nodeTemp = global_xmlDOC.getElementsByTagName('field');
            for (var i = 0; i < nodeTemp.length; i++) {
                var attrName = nodeTemp[i].attributes['name'].nodeValue;
                if ((typeof attrName !== 'undefined') && (attrName == attributeName)) {
                    listRealStory.push(nodeTemp[i]);
                }
            }

        } else
            listRealStory = global_xmlDOC.getElementsByTagName(nodeName);

        var listName = getElementName(listRealStory[0], 1);
        $(this).val($(this).val());
        /* Mandatory field*/
        showElementToOp(listName, 'field-headline-select');
        showElementToOp(listName, 'field-bodytext-select');
        // all field
        listNameForAllField(listName);
        // set text for div
        $('.hiddenSelect').text($(this).val().replace('.', ""));

    });

});

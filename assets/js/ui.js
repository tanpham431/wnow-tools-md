// The module pattern
var UI = (function() {

    //init all material design for all effect
    var init = function() {
        $.material.init(); //init material layout for all website
        $.material.ripples(); //add ripple effect when click elements
        $.material.input(); //add ripple for input elements
        $.material.checkbox(); // add ripple for checkbox
        // style for dropdownlist from dropdown.js
        $("select").dropdown({
            "optionClass": "withripple",
            "dropdownClass": "dropdownList"
        });
    };

    //show loader inwhile loading
    var showLoading = function() {
        $('.loading').show();
    };

    //hide loader inwhile loading
    var hideLoading = function() {
        $('.loading').hide();
    };

    var toggleMoreFieldsArea = function() {
        $('.other-field-area').slideToggle();
        $('#expand-other-fields-btn i').html() == "expand_more" ? $('#expand-other-fields-btn i').html('expand_less') : $('#expand-other-fields-btn i').html('expand_more');
    };

    var removeAllValueSelects = function() {
        $('.field-import-xml').html('');
    }

    var showElementToOp = function(listName, idElement) {

        var select = document.getElementById(idElement);
        select.innerHTML = '';
        $('#' + idElement).val('');
        var dot = '';
        for (var i = 0; i < listName.length; i++) {
            if (listName[i] == '#endlevel#') {
                dot += '...'
            } else {
                var option = document.createElement("option");
                option.value = listName[i];
                option.text = dot + listName[i];
                select.add(option);
            }

        }
        // show text to div up select tags
        $('.hiddenSelect').text($('.field-import-xml:first').val());
    };

    // Public function
    return {
        init: init,
        toggleMoreFieldsArea: toggleMoreFieldsArea,
        showLoading: showLoading,
        hideLoading: hideLoading,
        removeAllValueSelects: removeAllValueSelects,
        showElementToOp: showElementToOp
    };
})();

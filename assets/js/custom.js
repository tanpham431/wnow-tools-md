$(document).ready(function() {

    $.material.init(); //init material layout for all website
    $.material.ripples(); //add ripple effect when click elements
    $.material.input(); //add ripple for input elements
    $.material.checkbox(); // add ripple for checkbox

    // style for dropdownlist from dropdown.js
    $("select").dropdown({
        "optionClass": "withripple",
        "dropdownClass": "dropdownList"
    });

    //show/hide expand other fields area
    $('#expand-other-fields-btn').click(function() {
        $('.other-field-area').slideToggle();
        $('#expand-other-fields-btn i').html() == "expand_more" ? $('#expand-other-fields-btn i').html('expand_less') : $('#expand-other-fields-btn i').html('expand_more');
    });

});



$(function() {
    $( "#accordion" ).accordion();
  });


$(document).ready(function() {
    $("header").load("Header.html");
    $(".tortillaOption").click(addTortillaSelector);
    $(".fillingOption").click(addFillingSelector);

});

function addTortillaSelector(event){
    $(".tortillaOption").removeClass("selectedImage");
    $(this).addClass("selectedImage");
}

function addFillingSelector(event){
    $(".fillingOption").removeClass("selectedImage");
    $(this).addClass("selectedImage");
}




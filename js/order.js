

$(function() {
    $( "#accordion" ).accordion();
  });


$(document).ready(function() {
    $("header").load("Header.html");
    $(".tortillaOption").click(addTortillaSelector);
    $(".fillingOption").click(addFillingSelector);
    $( "#sauce input" ).each(addheatImage);
    $("#menuButtons button").click(addOrder);


});

function addTortillaSelector(event){
    $(".tortillaOption").removeClass("selectedImage");
    $(this).addClass("selectedImage");
}

function addFillingSelector(event){
    $(".fillingOption").removeClass("selectedImage");
    $(this).addClass("selectedImage");
}


function addheatImage(event){
    var element = $(this);
    var numImg = element.attr("heatrating");
    var name = element.attr("value");
    for(var i = 0; i < numImg; i++){
       $(this).next().append("<img src='img/heat.png'/>");
    }
}

function addOrder(event){
    var tacoName = $("#filling .selectedImage h4").text();
    $("#addedOrders").append("<button type='button'>X</button><button type='button'>"+ tacoName + " Taco</button><input type='number' class ='quantity' name='quantity' placeholder='Quantity' min='1'><br>");
}




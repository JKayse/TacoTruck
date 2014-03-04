

$(function() {
    $( "#accordion" ).accordion();
  });


$(document).ready(function() {
    $("header").load("Header.html");
    $(".tortillaOption").click(addTortillaSelector);
    $(".fillingOption").click(addFillingSelector);
    $( "#sauce input" ).each(addheatImage);
    $("#menuButtons button").click(addOrder);
    $("#orderMenu div").click(addCurrentCost);
    $(document).on('change', ".quantity", updateEveryTacoPrice);


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
    var tacoPrice = parseFloat($("#tacoPrice").attr("tacoPrice")).toFixed(2);
    $("#addedOrders").append("<span class = 'order' totValue ='" + tacoPrice + "'><button type='button'>X</button><button type='button'>"+ tacoName + " Taco</button><input type='number' class ='quantity' name='quantity' value='1' min='1' step='1'><span class='tacoPrice' tacoValue ='" + tacoPrice + "'>$"+tacoPrice+"</span></span><br>");
    updateTotalPrice();
}

function updateEveryTacoPrice(){
    var tacos = $("#addedOrders .order");
    for(var i = 0; i < tacos.size(); i++){
        var tacoValue = parseFloat(tacos.eq(i).children(".tacoPrice").attr("tacoValue"));
        var quantity =  parseFloat(tacos.eq(i).children(".quantity").val());
        var totalPrice = quantity * tacoValue;
        totalPrice = totalPrice*100;
        totalPrice = Math.round(totalPrice);
        totalPrice = totalPrice/100;
        totalPrice =totalPrice.toFixed(2);
        tacos.eq(i).children(".tacoPrice").html("$" + totalPrice);
        tacos.eq(i).attr("totValue", totalPrice);
        updateTotalPrice();
    }

}

function updateTotalPrice(){
    var totalPrice = 0;
    var tacoPrice = 0;
    var tacos = $("#addedOrders .order");
    for(var i = 0; i < tacos.size(); i++){
        tacoPrice = parseFloat(tacos.eq(i).attr("totValue"));
        totalPrice = totalPrice + tacoPrice;
    }

    totalPrice = totalPrice*100;
    totalPrice = Math.round(totalPrice);
    totalPrice = totalPrice/100;
    totalPrice =totalPrice.toFixed(2);
    $("#totalPrice").html("Total Price: $" + totalPrice);
    $("#totalPrice").attr("price", totalPrice);
}



function addCurrentCost(){
    var fillingPrice = $("#filling .selectedImage img").attr("price");
    fillingPrice = parseFloat(fillingPrice);

    var tortillaPrice = $("#tortilla .selectedImage img").attr("price");
    tortillaPrice = parseFloat(tortillaPrice);

    var cheese = $("#cheese input[type='radio']:checked");
    var cheesePrice = 0;
    if(cheese.size() !== 0){
        cheesePrice = cheese.attr("price");
        cheesePrice = parseFloat(cheesePrice);
    }

    var rice = $("#rice input[type='radio']:checked");
    var ricePrice = 0;
    if(rice.size() !== 0){
        ricePrice = rice.attr("price");
        ricePrice = parseFloat(ricePrice);
    }


    var beansPrice = $("#beans input[type='radio']:checked").attr("price");
    beansPrice = parseFloat(beansPrice);

    var beans = $("#beans input[type='radio']:checked");
    var beansPrice = 0;
    if(beans.size() !== 0){
        beansPrice = beans.attr("price");
        beansPrice = parseFloat(beansPrice);
    }


    var extras = $("#extras input[type='checkbox']:checked");
    var totalExtrasPrice = 0;
    var extrasPrice = 0;
    for(var i = 0; i < extras.size(); i++){
        extrasPrice = $(extras.get(i)).attr("price");
        extrasPrice = parseFloat(extrasPrice);
        totalExtrasPrice = extrasPrice + totalExtrasPrice;
    }

    totalExtrasPrice = totalExtrasPrice*100;
    totalExtrasPrice = Math.round(totalExtrasPrice);
    totalExtrasPrice = totalExtrasPrice/100;


    totalPrice = tortillaPrice + fillingPrice + cheesePrice + ricePrice + beansPrice + totalExtrasPrice;
    totalPrice = totalPrice*100;
    totalPrice = Math.round(totalPrice);
    totalPrice = totalPrice/100;
    totalPrice =totalPrice.toFixed(2);
    $("#tacoPrice").html("Current Price for each taco: $" + totalPrice);
    $("#tacoPrice").attr("tacoPrice",totalPrice);


}





$(function() {
    $( "#accordion" ).accordion();
  });


$(document).ready(function() {
    $("header").load("Header.html");
    $(".tortillaOption").click(addTortillaSelector);
    $(".fillingOption").click(addFillingSelector);
    $( "#sauce input" ).each(addheatImage);
    $("#menuButtons button").eq(0).click(addOrder);
    $("#menuButtons button").eq(1).click(resetOrder);
    $("#orderMenu div").click(addCurrentCostandTaco);
    $(document).on('change', ".quantity", updateEveryTacoPrice);
    $(document).on('click', ".order .delete", deleteOrder);
    $(document).on('click', ".order .itemList", populateTable);


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
    var tacoTortilla = $("#tacoTortilla").attr("tortilla");
    var tacoFilling = $("#tacoFilling").attr("filling");
    var tacoCheese = $("#tacoCheese").attr("cheese");
    var tacoRice = $("#tacoRice").attr("rice");
    var tacoBeans = $("#tacoBeans").attr("beans");
    var tacoSauce = $("#tacoSauce").attr("sauce");
    var tacoVegetables = $("#tacoVegetables").attr("vegetables");
    var tacoExtras = $("#tacoExtras").attr("extras");


    var tacoPrice = parseFloat($("#tacoPrice").attr("tacoPrice")).toFixed(2);
    $("#addedOrders").append("<span class = 'order' totValue ='" + tacoPrice + "'><button type='button' class = 'delete'>X</button><button type='button' class='itemList' filling='" + tacoFilling +"' tortilla='" + tacoTortilla +"' cheese='" + tacoCheese + "' rice='" + tacoRice +"' beans='" + tacoBeans +"' sauce='" + tacoSauce +"' vegetables='" + tacoVegetables +"' extras='" + tacoExtras +"'>"+ tacoName + " Taco</button><input type='number' class ='quantity' name='quantity' value='1' min='1' step='1'><span class='tacoPrice' tacoValue ='" + tacoPrice + "'>$"+tacoPrice+"</span><div class='tacoDetails'>''</div></span><br>");
    var tacos = $(".tacoDetails");
    for(var i = 0; i<tacos.size();i++){
        
        var taco = $(".order .itemList").eq(i)
        tacoTortilla = taco.attr('tortilla');
        tacoFilling = taco.attr('filling');
        tacoCheese = taco.attr('cheese');
        tacoRice = taco.attr('rice');
        tacoBeans = taco.attr('beans');
        tacoSauce = taco.attr('sauce');
        tacoVegetables = taco.attr('vegetables');
        tacoExtras = taco.attr('extras');


        var insert = "<img src = 'img/leftArrow.png' alt='Arrow' title='Arrow'><h5>Tortilla: " + tacoTortilla +"</h5><h5>Filling: " + tacoFilling +"</h5>";
        if(tacoCheese !== ""){
            insert = insert + "<h5><b>Cheese:</b> " + tacoCheese +"</h5>";
        }
        if(tacoRice !== ""){
            insert = insert + "<h5>Rice: " + tacoRice +"</h5>";
        }
        if(tacoBeans !== ""){
            insert = insert + "<h5>Beans: " + tacoBeans +"</h5>";
        }
        if(tacoSauce !== ""){
            insert = insert + "<h5>Sauce: " + tacoSauce +"</h5>";
        }
        if(tacoVegetables !== ""){
            insert = insert + "<h5>Vegetables: " + tacoVegetables +"</h5>";
        }
        if(tacoExtras !== ""){
            insert = insert + "<h5>Extras: " + tacoExtras +"</h5>";
        }

        tacos.eq(i).html(insert);
    }
    
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



function addCurrentCostandTaco(){

    var tacoFilling = $("#filling .selectedImage h4").text();  
    var fillingPrice = $("#filling .selectedImage img").attr("price");
    fillingPrice = parseFloat(fillingPrice);
    $("#tacoFilling").html("Filling: " + tacoFilling);
    $("#tacoFilling").attr("filling", tacoFilling);


    var tacoTortilla = $("#tortilla .selectedImage h4").text();
    var tortillaPrice = $("#tortilla .selectedImage img").attr("price");
    tortillaPrice = parseFloat(tortillaPrice);
    $("#tacoTortilla").html("Tortilla: " + tacoTortilla);
    $("#tacoTortilla").attr("tortilla", tacoTortilla);

    var cheese = $("#cheese input[type='radio']:checked");
    var cheesePrice = 0;
    if(cheese.size() !== 0){
        cheesePrice = cheese.attr("price");
        cheesePrice = parseFloat(cheesePrice);
        var tacoCheese = cheese.val();
        if(tacoCheese === "No Cheese"){
            $("#tacoCheese").html("");
            $("#tacoCheese").attr("cheese", "");
        }
        else{
            $("#tacoCheese").html("Cheese: " + tacoCheese);
            $("#tacoCheese").attr("cheese", tacoCheese);
        }

    }

    var rice = $("#rice input[type='radio']:checked");
    var ricePrice = 0;
    if(rice.size() !== 0){
        ricePrice = rice.attr("price");
        ricePrice = parseFloat(ricePrice);
        var tacoRice = rice.val();
        if(tacoRice === "No Rice"){
            $("#tacoRice").html("");
            $("#tacoRice").attr("rice", "");
        }
        else{
            $("#tacoRice").html("Rice: " + tacoRice);
            $("#tacoRice").attr("rice", tacoRice);
        }
    }


    var beansPrice = $("#beans input[type='radio']:checked").attr("price");
    beansPrice = parseFloat(beansPrice);

    var beans = $("#beans input[type='radio']:checked");
    var beansPrice = 0;
    if(beans.size() !== 0){
        beansPrice = beans.attr("price");
        beansPrice = parseFloat(beansPrice);
        var tacoBeans = beans.val();
        if(tacoBeans === "No Beans"){
            $("#tacoBeans").html("");
            $("#tacoBeans").attr("beans", "");
        }
        else{
            $("#tacoBeans").html("Beans: " + tacoBeans);
            $("#tacoBeans").attr("beans", tacoBeans);
        }
    }


    var sauce = $("#sauce input[type='radio']:checked");
    if(sauce.size() !== 0){
        var tacoSauce = sauce.val();
        if(tacoSauce === "No Sauce"){
            $("#tacoSauce").html("");
            $("#tacoSauce").attr("sauce", "");
        }
        else{
            $("#tacoSauce").html("Sauce: " + tacoSauce);
            $("#tacoSauce").attr("sauce", tacoSauce);
        }
    }

    var vegetables = $("#vegetables input[type='checkbox']:checked");
    var tacoVeggies ="";
    for(var i = 0; i < vegetables.size(); i++){
        tacoVeggies = tacoVeggies + ", " + $(vegetables.get(i)).val();
    }
    if(vegetables.size() !== 0){
        tacoVeggies = tacoVeggies.substring(2);
        $("#tacoVegetables").html("Vegetables: " + tacoVeggies);
        $("#tacoVegetables").attr("vegetables", tacoVeggies);
    }
    else{
        $("#tacoVegetables").html("");
        $("#tacoVegetables").attr("vegetables", "");
    }


    var extras = $("#extras input[type='checkbox']:checked");
    var totalExtrasPrice = 0;
    var extrasPrice = 0;
    var tacoExtras ="";
    $("#tacoExtras").attr("extras", "");
    for(var i = 0; i < extras.size(); i++){
        extrasPrice = $(extras.get(i)).attr("price");
        extrasPrice = parseFloat(extrasPrice);
        totalExtrasPrice = extrasPrice + totalExtrasPrice;
        tacoExtras = tacoExtras + ", " + $(extras.get(i)).val();

    }


    if(extras.size() !== 0){
        tacoExtras = tacoExtras.substring(2);
        $("#tacoExtras").html("Extras: " + tacoExtras);
        $("#tacoExtras").attr("extras", tacoExtras);
    }


    totalExtrasPrice = totalExtrasPrice*100;
    totalExtrasPrice = Math.round(totalExtrasPrice);
    totalExtrasPrice = totalExtrasPrice/100;


    totalPrice = tortillaPrice + fillingPrice + cheesePrice + ricePrice + beansPrice + totalExtrasPrice;
    totalPrice = totalPrice*100;
    totalPrice = Math.round(totalPrice);
    totalPrice = totalPrice/100;
    totalPrice =totalPrice.toFixed(2);
    $("#tacoPrice").html("Current Price: $" + totalPrice + "/ea");
    $("#tacoPrice").attr("tacoPrice",totalPrice);


}

function resetOrder(){

}

function deleteOrder(){
    tacoOrder = $(this).parent();
    tacoOrder.next().remove();
    tacoOrder.remove();
}

function populateTable(){
    var taco = $(this)
    tacoTortilla = taco.attr('tortilla');
    tacoFilling = taco.attr('filling');
    tacoCheese = taco.attr('cheese');
    tacoRice = taco.attr('rice');
    tacoBeans = taco.attr('beans');
    tacoSauce = taco.attr('sauce');
    tacoVegetables = taco.attr('vegetables');
    tacoExtras = taco.attr('extras');

}


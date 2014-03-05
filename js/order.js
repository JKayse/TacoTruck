

$(function() {
    $( "#accordion" ).accordion({collapsible: true} );
  });


$(document).ready(function() {
    $("header").load("Header.html");
    $(".tortillaOption").click(addTortillaSelector);
    $(".fillingOption").click(addFillingSelector);
    $("#menuButtons button").eq(0).click(addOrder);
    $("#menuButtons button").eq(1).click(resetOrder);
    $("#orderMenu div").click(addCurrentCostandTaco);
    $(document).on('change', ".quantity", updateEveryTacoPrice);
    $(document).on('click', ".order .delete", deleteOrder);
    $(document).on('click', ".order .itemList", populateTable);
    $(document).on('click', "#orderMenu .itemList", populateTable);
    $(document).on('mouseover', ".order", setHoverPosition);
   


    $.ajax({url:"api/Orders/Tortillas/", success: function(json){
        json = JSON.parse(json);
        var tortilla = json.Tortillas;
        for(var i = 0; i < tortilla.length ; i++){
            var name = tortilla[i].Name;
            var price = parseFloat(tortilla[i].Price).toFixed(2);
            var item = "<div class='tortillaOption'><img src='img/"+ name +".png' alt='"+name+" Tortilla' title='"+name+" Tortilla' price='" +price+"'><h4>" + name +"</h4></div>";
            $("#tortilla").append(item);
        }
        $(".tortillaOption").eq(0).addClass("selectedImage");
    }});

    $.ajax({url:"api/Orders/Filling/", success: function(json){
        json = JSON.parse(json);
        var filling = json.Filling;
        for(var i = 0; i < filling.length ; i++){
            var name = filling[i].Name;
            var price = parseFloat(filling[i].Price).toFixed(2);
            var item = "<div class='fillingOption'><img src='img/"+ name +".png' alt='"+name+" Taco' title='"+name+" Taco' price='" +price+"'><h4>" + name +"</h4></div>";
            $("#filling").append(item);
        }
        $(".fillingOption").eq(0).addClass("selectedImage");
    }});


    $.ajax({url:"api/Orders/Cheese/", success: function(json){
        json = JSON.parse(json);
        var cheese = json.Cheese;
        for(var i = 0; i < cheese.length ; i++){
            var name = cheese[i].Name;
            var price = parseFloat(cheese[i].Price).toFixed(2);
            var item = "<div class='cheeseOption'><input type='radio' name='cheese' value ='" + name + "' price='" +price+"' title='"+name+"'>" + name + "</input></div>";
            $("#cheese").append(item);
        }
        var noItem = "<div class='cheeseOption'><input type='radio' name='cheese' value ='No Cheese' price='0.00' title='No Cheese'>No Cheese</input></div>";
        $("#cheese").append(noItem);
    }});

    $.ajax({url:"api/Orders/Rice/", success: function(json){
        json = JSON.parse(json);
        var rice = json.Rice;
        for(var i = 0; i < rice.length ; i++){
            var name = rice[i].Name;
            var price = parseFloat(rice[i].Price).toFixed(2);
            var item = "<div class='riceOption'><input type='radio' name='rice' value ='" + name + "' price='" +price+"' title='"+name+"'>" + name + "</input></div>";
            $("#rice").append(item);
        }
        var noItem = "<div class='riceOption'><input type='radio' name='rice' value ='No Rice' price='0.00' title='No Rice'>No Rice</input></div>";
        $("#rice").append(noItem);
    }});

    $.ajax({url:"api/Orders/Beans/", success: function(json){
        json = JSON.parse(json);
        var beans = json.Beans;
        for(var i = 0; i < beans.length ; i++){
            var name = beans[i].Name;
            var price = parseFloat(beans[i].Price).toFixed(2);
            var item = "<div class='beansOption'><input type='radio' name='beans' value ='" + name + "' price='" +price+"' title='"+name+"'>" + name + "</input></div>";
            $("#beans").append(item);
        }
        var noItem = "<div class='beansOption'><input type='radio' name='beans' value ='No Beans' price='0.00' title='No Beans'>No Beans</input></div>";
        $("#beans").append(noItem);
    }});

    $.ajax({url:"api/Orders/Sauces/", success: function(json){
        json = JSON.parse(json);
        var sauce = json.Sauces;
        for(var i = 0; i < sauce.length ; i++){
            var name = sauce[i].Name;
            var price = parseFloat(sauce[i].Price).toFixed(2);
            var heatrating = sauce[i].HeatRating;
            if(name !== "No Sauce"){
                var item = "<div class='sauceOption'><input type='radio' name='sauce' value ='" + name + "' price='" +price+"' title='"+name+"' heatrating='" + heatrating +"'>" + name + "</input><span class='heatImage'></span></div>";
                $("#sauce").append(item);
            }
        }
        var noItem = "<div class='sauceOption'><input type='radio' name='sauce' value ='No Sauce' price='0.00' title='No Sauce' heatrating ='0'>No Sauce</input><span class='heatImage'></span></div>";
        $("#sauce").append(noItem);
        $( "#sauce input" ).each(addheatImage);
    }});

    $.ajax({url:"api/Orders/Vegetables/", success: function(json){
        json = JSON.parse(json);
        var vegetables = json.Vegetables;
        for(var i = 0; i < vegetables.length ; i++){
            var name = vegetables[i].Name;
            var price = parseFloat(vegetables[i].Price).toFixed(2);
            var item = "<div class='veggieOption'><input type='checkbox' name='veggie' value ='" + name + "' price='" +price+"' title='"+name+"'>" + name + "</input></div>";
            $("#vegetables").append(item);
        }
        var button = "<br><button type='button'>Select All</button>";
        $("#vegetables").append(button);
    }});

    $.ajax({url:"api/Orders/Extras/", success: function(json){
        json = JSON.parse(json);
        var extras = json.Extras;
        for(var i = 0; i < extras.length ; i++){
            var name = extras[i].Name;
            var price = parseFloat(extras[i].Price).toFixed(2);
            var item = "<div class='extrasOption'><input type='checkbox' name='extras' value ='" + name + "' price='" +price+"' title='"+name+"'>" + name + "</input></div>";
            $("#extras").append(item);
        }
        var button = "<br><button type='button'>Select All</button>";
        $("#extras").append(button);
    }});

    


});

function setHoverPosition()
{
    var spans = $(".order");
    for(var i = 0; i < spans.size(); i++)
    {
        var position = spans.eq(i).position();
        $(".order .tacoDetails").eq(i).offset({top:position.top, left:380});
    }
    
}


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
    updateTotalPrice();
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

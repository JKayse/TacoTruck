//Functionality for the order page



$(document).ready(function() {
    //Check if user is logged in or not. If they are are, add the order previous button and the new welcome bar with their name. 

    
    $("header").load("Header.html");
    $("#menuButtons button").eq(0).click(addOrder);
    $("#menuButtons button").eq(1).click(resetOrder);
    $("#orderMenu div").click(addCurrentCostandTaco);
    $(document).on('change', ".quantity", updateEveryTacoPrice);
    $(document).on('click', ".order .delete", deleteOrder);
    $(document).on('mouseover', ".order", setHoverPosition);
    $(document).on('click', "#selectVegetables", addAllVeggies);
    $(document).on('click', "#selectExtras", addAllExtras);
    $(document).on('click', "#deselectVegetables", deleteAllVeggies);
    $(document).on('click', "#deselectExtras", deleteAllExtras);
    $(document).on('click', ".tortillaOption", addTortillaSelector);
    $(document).on('click', ".fillingOption", addFillingSelector);
    $(document).on('click', "#payOrder", payPopup);
    $(document).on('click', "header img", goToHomePage);
    $(document).on('click', "header h1", goToHomePage);
    $(document).on('click', "#homepage", goToHomePage);
    $(document).on('click', "#newOrder", orderAgain);
    $(document).on('click', "#locations", goToMap);
    $(document).on('click', "#cancel", cancelPayment);
    $(document).on('submit', "#giveMeMoney", finalizeOrder);
    $(document).on('submit', "#signInArea", signIn);
    $(document).on('click', "#orderPrevious", showOrderPrevious);
    $(document).on('click', "#cancelPrevTacos", hideOrderPrevious);
    $(document).on('click', "#addPrevTacos", addOrderPrevious);
    $(document).on('click', "#signOut", signout);
    calculatePreviousOrder();
    

   


    $.ajax({url:"api/Menu/Tortillas", success: function(json){
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

    $.ajax({url:"api/Menu/type", success: function(json){
        json = JSON.parse(json);
        var filling = json.type;
        for(var i = 0; i < filling.length ; i++){
            var name = filling[i].Name;
            var price = parseFloat(filling[i].Price).toFixed(2);
            var item = "<div class='fillingOption'><img src='img/"+ name +".png' alt='"+name+" Taco' title='"+name+" Taco' price='" +price+"'><h4>" + name +"</h4></div>";
            $("#filling").append(item);
        }
        $(".fillingOption").eq(0).addClass("selectedImage");
    }});


    $.ajax({url:"api/Menu/Cheese", success: function(json){
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

    $.ajax({url:"api/Menu/Rice", success: function(json){
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

    $.ajax({url:"api/Menu/Beans", success: function(json){
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

    $.ajax({url:"api/Menu/Sauces", success: function(json){
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

    $.ajax({url:"api/Menu/Vegetables", success: function(json){
        json = JSON.parse(json);
        var vegetables = json.Vegetables;
        for(var i = 0; i < vegetables.length ; i++){
            var name = vegetables[i].Name;
            var price = parseFloat(vegetables[i].Price).toFixed(2);
            var item = "<div class='veggieOption'><input type='checkbox' name='veggie' value ='" + name + "' price='" +price+"' title='"+name+"'>" + name + "</input></div>";
            $("#vegetables").append(item);
        }
        var buttons = "<br><div id='veggieButtons'><button class='button' id='selectVegetables' type='button'>Select All</button><button class='button' id='deselectVegetables' type='button'>Deselect All</button></div>";
        $("#vegetables").append(buttons);
    }});

    $.ajax({url:"api/Menu/Extras", success: function(json){
        json = JSON.parse(json);
        var extras = json.Extras;
        for(var i = 0; i < extras.length ; i++){
            var name = extras[i].Name;
            var price = parseFloat(extras[i].Price).toFixed(2);
            var item = "<div class='extrasOption'><input type='checkbox' name='extras' value ='" + name + "' price='" +price+"' title='"+name+"'>" + name + "</input></div>";
            $("#extras").append(item);
        }
        var buttons = "<br><div id='extraButtons'><button  class='button' id='selectExtras' type='button'>Select All</button><button  class='button' id='deselectExtras' type='button'>Deselect All</button></div>";
        $("#extras").append(buttons);
    }});



    


});


$(function() {
    $( "#accordion" ).accordion({collapsible: true} );
});

function setHoverPosition()
{
    var spans = $(".order");
    for(var i = 0; i < spans.size(); i++)
    {
        var position = spans.eq(i).position();
        left = position.left;
        left = left + spans.eq(i).width();
        $(".order .tacoDetails").eq(i).offset({top:position.top, left: left});
    }
    
}


function addTortillaSelector(event){
    $(".tortillaOption").removeClass("selectedImage");
    $(this).addClass("selectedImage");
    addCurrentCostandTaco();
}

function addFillingSelector(event){
    $(".fillingOption").removeClass("selectedImage");
    $(this).addClass("selectedImage");
    addCurrentCostandTaco();
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
    var tacoQuantity = parseFloat($(".enterQuantity").val());



    var tacoPrice = parseFloat($("#tacoPrice").attr("tacoPrice")).toFixed(2);
    $("#addedOrders").append("<span class = 'order curOrder' totValue ='" + tacoPrice + "'><button type='button' class = 'delete button'>X</button><button type='button' class='itemList button' filling='" + tacoFilling +"' tortilla='" + tacoTortilla +"' cheese='" + tacoCheese + "' rice='" + tacoRice +"' beans='" + tacoBeans +"' sauce='" + tacoSauce +"' vegetables='" + tacoVegetables +"' extras='" + tacoExtras +"'>"+ tacoName + " Taco</button><input type='number' class ='quantity' name='quantity' value='" + tacoQuantity +"' min='0' step='1'><span class='tacoPrice' tacoValue ='" + tacoPrice + "'>$"+tacoPrice+"</span><div class='tacoDetails'>''</div></span><br>");
    updateEveryTacoPrice();
    var tacos = $(".curOrder .tacoDetails");
    for(var i = 0; i<tacos.size();i++){
        
        var taco = $(".order .itemList").eq(i);
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
    resetOrder();
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
    else{
        $("#tacoCheese").html("");
        $("#tacoCheese").attr("cheese", "");
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
    else{
        $("#tacoRice").html("");
        $("#tacoRice").attr("rice", "");
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
    else{
        $("#tacoBeans").html("");
        $("#tacoBeans").attr("beans", "");
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
    else{
        $("#tacoSauce").html("");
        $("#tacoSauce").attr("sauce", "");
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
    else{
        $("#tacoExtras").html("");
        $("#tacoExtras").attr("extras", "");
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
    $(".tortillaOption").removeClass("selectedImage");
    $(".tortillaOption").eq(0).addClass("selectedImage")
    $(".fillingOption").removeClass("selectedImage");
    $(".fillingOption").eq(0).addClass("selectedImage")
    $(".cheeseOption input").prop('checked', false);
    $(".riceOption input").prop('checked', false);
    $(".beansOption input").prop('checked', false);
    $(".sauceOption input").prop('checked', false);
    deleteAllVeggies();
    deleteAllExtras();
    $(".enterQuantity").val("1");

}


function addAllVeggies(){
    $(".veggieOption input").prop('checked', true);
    addCurrentCostandTaco();
    
}

function addAllExtras(){
    $(".extrasOption input").prop('checked', true);
    addCurrentCostandTaco();
    
}

function deleteAllVeggies(){
    $(".veggieOption input").prop('checked', false);
    addCurrentCostandTaco();
    
}

function deleteAllExtras(){
    $(".extrasOption input").prop('checked', false);
    addCurrentCostandTaco();
    
}

function payPopup(){
    if($(".order").size() !== 0){
        $("#blackScreenofDeath").css("display","block");
        $("#payment").css("display","block");
        $("#payInfo").css("display","block");

        var total = $("#totalPrice").attr("price");
        $("#paymentTotal").html("Your order comes out to: $" + total);
        $.ajax({url:"api/Payment/1", success: function(json){
        json = JSON.parse(json);
        var userInfo = json.Payment;
        var fName = userInfo[0].GivenName;
        var lName = userInfo[0].SurName;
        var providerName = userInfo[0].CC_Provider;
        var number = userInfo[0].CC_Number;
        var twoInputs = $("#giveMeMoney input");

        $("#provider option[value='" + providerName + "']").prop('selected',true);
        twoInputs.eq(0).val(userInfo[0].GivenName);
        twoInputs.eq(1).val(userInfo[0].SurName);
        $("#number").val(userInfo[0].CC_Number);

    }});

    }
    else{
        alert("Please order at least one taco to continue. Thanks! :)");
    }

}

function cancelPayment(){
    $("#blackScreenofDeath").css("display","none");
    $("#payment").css("display","none");
}


function deleteOrder(){
    tacoOrder = $(this).parent();
    tacoOrder.next().remove();
    tacoOrder.remove();
    updateTotalPrice();
}

function goToHomePage(){
    window.location = "index.html";
}

function orderAgain(){
    window.location = "orderpage.html";
}

function goToMap(){
    window.location = "map.html";
}

function finalizeOrder(event){
    event.preventDefault();
    $("#payInfo").css("display", "none");
    $("#paySuccess").css("display", "block");
    
   $.ajax({
            type: "POST",
            url: "api/Orders",
            data: {
                order: createOrder()
            }
    });
    
}


function showOrderPrevious(){
    if($(".prevTaco").length === 0){
        alert("You have no previous orders. Please add an order first. Thanks! :)");
    }
    else{
        $("#blackScreenofDeath").css("display","block");
        $("#payment").css("display","block");
        $("#previousOrder").css("display","block");
        $("#payInfo").css("display", "none");
        $("#paySuccess").css("display", "none");
    }
}

function hideOrderPrevious(){
    $("#blackScreenofDeath").css("display","none");
    $("#payment").css("display","none");
    $("#previousOrder").css("display","none");
    $("#payInfo").css("display", "none");
    $("#paySuccess").css("display", "none");
}

function addOrderPrevious(){
    var prevOrderTotal = $("#totalPreviousPrice").attr("price");
    $("#addedOrders").append("<span class = 'order prevOrder' totValue ='" + prevOrderTotal + "'><button type='button' class = 'delete button'>X</button><button type='button' class='button'>Previous Order</button><input type='number' class ='quantity' name='quantity' value='1' min='1' step='1'><span class='tacoPrice' tacoValue ='" + prevOrderTotal + "'>$"+prevOrderTotal+"</span><div class='tacoDetails'>''</div></span><br>");
    var insert2 = "<img src = 'img/leftArrow.png' alt='Arrow' title='Arrow'>";
    insert2 = insert2 + $('#previousOrderList').html();
    var taco = $(".prevOrder .tacoDetails");
    taco.html(insert2);
    updateTotalPrice();

    $("#blackScreenofDeath").css("display","none");
    $("#payment").css("display","none");
    $("#previousOrder").css("display","none");
    $("#payInfo").css("display", "none");
    $("#paySuccess").css("display", "none");
}

function createOrder(){
    var prevOrders = $(".prevOrder")
    var prevTacoDetails = $(".tacoDetails .prevTaco");
    var curTacoDetails = $(".curOrder");
    var tacos = [];
    var taco = {};
    var order = {};
    var toppings = [];
    var quantity;
    var tortilla;
    var filling;
    var cheese;
    var rice;
    var beans;
    var sauce;
    var vegetables;
    var extras;
    var quantityWanted;
    for(var j = 0; j < prevOrders.length; j++){
        prevTacoDetails = prevOrders.eq(j).children(".tacoDetails").children(".prevTaco");
        quantityWanted = prevOrders.eq(j).children(".quantity").val();
        quantityWanted = parseFloat(quantityWanted);

        
        for(var i = 0; i < prevTacoDetails.length ; i++){
            var taco = {};
            tortilla = prevTacoDetails.eq(i).children(".prevTortilla");
            toppings.push(tortilla.attr("tortilla"));
            filling = prevTacoDetails.eq(i).children(".prevFilling");
            toppings.push(filling.attr("filling"));
            cheese = prevTacoDetails.eq(i).children(".prevCheese");
            if(cheese.length !== 0){
                toppings.push(cheese.attr("cheese"));
            }
            rice = prevTacoDetails.eq(i).children(".prevRice");
            if(rice.length !== 0){
                toppings.push(rice.attr("rice"));
            }
            beans = prevTacoDetails.eq(i).children(".prevBeans");
            if(beans.length !== 0){
                toppings.push(beans.attr("beans"));
            }
            sauce = prevTacoDetails.eq(i).children(".prevSauce");
            if(sauce.length !== 0){
                toppings.push(sauce.attr("sauce"));
            }
            vegetables = prevTacoDetails.eq(i).children(".prevVeggies");
            if(vegetables.length !== 0){
                var vegetables = vegetables.attr("extras");
                var res = vegetables.split(", ");
                for(var k = 0; k < res.length; k++){
                    toppings.push(res[k]);
                }
                
            }
            extras = prevTacoDetails.eq(i).children(".prevExtras");
            if(extras.length !== 0){
                var extras = extras.attr("extras");
                var res = extras.split(", ");
                for(var k = 0; k < res.length; k++){
                    toppings.push(res[k]);
                }
                
            }
            quantity = prevTacoDetails.eq(i).children(".prevQuantity");
            quantity = quantity.attr("quantity");
            quantity = parseFloat(quantity);
            finalQuantity = quantity * quantityWanted;

            taco.toppings= toppings;
            taco.quantity = finalQuantity;
            toppings = [];
            quantity="";
            tacos.push(taco);
        }
        quantityWanted ="";

    }

    for(var i = 0; i < curTacoDetails.length ; i++){
        var taco = {};
        var items = curTacoDetails.eq(i).children(".itemList");
        var quantity = curTacoDetails.eq(i).children(".quantity").val();
        quantity = parseFloat(quantity);

        tortilla = items.attr("tortilla");
        toppings.push(tortilla);

        filling = items.attr("filling");
        toppings.push(filling);

        cheese = items.attr("cheese");
        if(cheese !== ""){
            toppings.push(cheese);
        }

        rice = items.attr("rice");
        if(rice !== ""){
            toppings.push(rice);
        }

        beans = items.attr("beans");
        if(beans !== ""){
            toppings.push(beans);
        }

        sauce = items.attr("sauce");
        if(sauce !== ""){
            toppings.push(sauce);
        }

        vegetables = items.attr("vegetables");
        if(vegetables !== ""){
            var res = vegetables.split(", ");
            for(var j = 0; j < res.length; j++){
                toppings.push(res[j]);
            }
        }

        extras = items.attr("extras");
        if(extras !== ""){
            var res = extras.split(", ");
            for(var j = 0; j < res.length; j++){
                toppings.push(res[j]);
            }
        }

        taco.quantity = quantity;
        taco.toppings = toppings;
        toppings = [];
        quantity="";
        tacos.push(taco);
    }

    order.tacos = tacos;
    price = $("#totalPrice").attr("price")
    price = "$"+ price;
    order.price = price;
    
    order = JSON.stringify(order);
    console.log(order);
    return order;

}

function signIn(){
    event.preventDefault();
    /*$.ajax({
            type: "POST",
            url: "api/Login",
            data: {
                email: $("#signInEmail").val(),
                password: $("#signInPass").val()
            },
            success: function(json){
                if(json === null){
                    alert("The information entered was not correct. Try Again.");
                }
                else{
                    json = JSON.parse(json);
                    $("#signInEmail").val("");
                    $("#signInPass").val("");
                    $("#orderPrevious").css("display", "block");
                    $("#signIn").css("display", "none");
                    $("#signedIn").css("display", "block");
                    calculatePreviousOrder();

                }

            }
    });
    */
}

function signout(){
    $.ajax({
            type: "POST",
            url: "api/Logout",
            success: function(){
                $("#signIn").css("display", "block");
                $("#signedIn").css("display", "none");
            }});

}


function calculatePreviousOrder(){
        //get userId from database.

        $.ajax({url:"api/PreviousOrders/1", success: function(json){
        json = JSON.parse(json);
        var orderId = json.OrderId;
        var id = orderId[0].OrderId;
        if(id === null){
            return;
        }
        $.ajax({url:"api/Orders/" + id, success: function(json){
            json = JSON.parse(json);
            var order = json.Order;
            if(order === null){
                return;
            }
            var orderItemId = order[0].OrderItemId;
            var quantity= order[0].Quantity;
            var total = order[0].Total;
            var type = order[0].ItemType;
            var name = order[0].Name;

            $("#totalPreviousPrice").html("The total price is: " + total);
            total = total.substring(1);
            $("#totalPreviousPrice").attr("price", total);
            var tortilla ="";
            var filling ="";
            var cheese ="";
            var rice ="";
            var beans="";
            var sauce="";
            var vegetables="";
            var extras="";
            var addSection="";
            if(type === "type"){
                var filling = name;
            }
            if(type === "tortillas"){
                var tortilla = name;
            }
            if(type === "cheese"){
                var cheese = name;
            }
            if(type === "rice"){
                var rice = name;
            }
            if(type === "beans"){
                var beans = name;
            }
            if(type === "sauces"){
                var sauce = name;
            }
            if(type === "vegetables"){
                var vegetables = name;
            }
            if(type === "extras"){
                var extras = name;
            }

            for(var i = 1; i < order.length; i++){
                if(orderItemId === order[i].OrderItemId){
                    type = order[i].ItemType;
                    name = order[i].Name;                    


                    if(type === "type"){
                        filling = name;
                    }
                    if(type === "tortillas"){
                        tortilla = name;
                    }
                    if(type === "cheese"){
                        cheese = name;
                    }
                    if(type === "rice"){
                        rice = name;
                    }
                    if(type === "beans"){
                        beans = name;
                    }
                    if(type === "sauces"){
                        sauce = name;
                    }
                    if(type === "vegetables"){
                        vegetables = vegetables + ", "+ name;
                    }
                    if(type === "extras"){
                        extras = extras + ", "+ name;
                    }
                }
                else{
                    //add previous order to thing
                    
                    
                    addSection = "<div class = 'prevTaco'><h5 class='prevTortilla' tortilla='" + tortilla + "'>Tortilla: " + tortilla + "</h5><h5 class='prevFilling' filling='" + filling + "'>Filling: " + filling + "</h5>";
                    if(cheese !== ""){
                        addSection = addSection + "<h5 class='prevCheese' cheese='" + cheese + "'>Cheese: " + cheese + "</h5>";
                    }
                    if(rice !== ""){
                        addSection = addSection + "<h5 class='prevRice' rice='" + rice + "'>Rice: " + rice + "</h5>";
                    }
                    if(beans !== ""){
                        addSection = addSection + "<h5 class='prevBeans' beans='" + beans + "'>Beans: " + beans + "</h5>";
                    }
                    if(sauce !== ""){
                        addSection = addSection + "<h5 class='prevSauce' sauce='" + sauce + "'>Sauce: " + sauce + "</h5>";
                    }
                    if(vegetables !== ""){
                        vegetables = vegetables.substring(2);
                        addSection = addSection + "<h5 class='prevVeggies' veggie='" + vegetables + "'>Vegetables: " + vegetables + "</h5>";
                    }
                    if(extras !== ""){
                        extras = extras.substring(2);
                        addSection = addSection + "<h5 class='prevExtras' extras='" + extras + "'>Extras: " + extras + "</h5>";
                    }
                    
                    addSection = addSection + "<h5 class='prevQuantity' quantity='" + quantity + "'>Quantity: " + quantity + "</h5></div><hr>";
                    $("#previousOrderList").append(addSection);

                    addSection="";
                    tortilla ="";
                    filling ="";
                    cheese ="";
                    rice ="";
                    beans="";
                    sauce="";
                    vegetables="";
                    extras="";

                    orderItemId = order[i].OrderItemId;
                    quantity = order[i].Quantity;
                    type = order[i].ItemType;
                    name = order[i].Name;                    


                    if(type === "type"){
                        filling = name;
                    }
                    if(type === "tortillas"){
                        tortilla = name;
                    }
                    if(type === "cheese"){
                        cheese = name;
                    }
                    if(type === "rice"){
                        rice = name;
                    }
                    if(type === "beans"){
                        beans = name;
                    }
                    if(type === "sauces"){
                        sauce = name;
                    }
                    if(type === "vegetables"){
                        vegetables = vegetables + ", "+ name;
                    }
                    if(type === "extras"){
                        extras = extras + ", "+ name;
                    }

                }


            }
            addSection = "<div class = 'prevTaco'><h5 class='prevTortilla' tortilla='" + tortilla + "'>Tortilla: " + tortilla + "</h5><h5 class='prevFilling' filling='" + filling + "'>Filling: " + filling + "</h5>";
            if(cheese !== ""){
                addSection = addSection + "<h5 class='prevCheese' cheese='" + cheese + "'>Cheese: " + cheese + "</h5>";
            }
            if(rice !== ""){
                addSection = addSection + "<h5 class='prevRice' rice='" + rice + "'>Rice: " + rice + "</h5>";
            }
            if(beans !== ""){
                addSection = addSection + "<h5 class='prevBeans' beans='" + beans + "'>Beans: " + beans + "</h5>";
            }
            if(sauce !== ""){
                addSection = addSection + "<h5 class='prevSauce' sauce='" + sauce + "'>Sauce: " + sauce + "</h5>";
            }
            if(vegetables !== ""){
                vegetables = vegetables.substring(2);
                addSection = addSection + "<h5 class='prevVeggies' veggie='" + vegetables + "'>Vegetables: " + vegetables + "</h5>";
            }
            if(extras !== ""){
                extras = extras.substring(2);
                addSection = addSection + "<h5 class='prevExtras' extras='" + extras + "'>Extras: " + extras + "</h5>";
            }
            addSection = addSection + "<h5 class='prevQuantity' quantity='" + quantity + "'>Quantity: " + quantity + "</h5></div>";
            $("#previousOrderList").append(addSection);

        }});

    }});
}
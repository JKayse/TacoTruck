// JavaScript Document

$(document).ready(function() {
    $("header").load("Header.html");
    $(document).on('click', "header img", goToHomePage);
    $(document).on('click', "header h1", goToHomePage);
    $(document).on('click', "#homepage", goToHomePage);
    $(document).on('click', "#guestOrder", goToOrderPage);
    $(document).on('click', "#locations", goToMap);
    $(document).on('submit', "#signUpform", signUp);
    $(document).on('submit', "#signInArea", signIn);
    $(document).on('click', "header #signedIn a", signout);

    $.ajax({url:"api/LoginStatus", success: function(json){
            if(json !== 'null'){
                json = JSON.parse(json);
                var email = json.Email;
                $("#signedIn h2").html("Welcome!");
                $("#signInEmail").val("");
                $("#signInPass").val("");
                $("#orderPrevious").css("display", "block");
                $("#signIn").css("display", "none");
                $("#signedIn").css("display", "block");
                calculatePreviousOrder();
                
            }
            else{
                return;
            }
        }});   

});

function goToHomePage(){
    window.location = "index.html";
}

function goToOrderPage(){
    window.location = "orderpage.html";
}

function goToMap(){
    window.location = "map.html";
}

function signUp(event){
    event.preventDefault();
    var password = $("#password").val();
    var cpassword = $("#confirmPassword").val();

    if(password !== cpassword){
        alert("Passwords do not match. Try again.");
        return;
    }
    else{
        $.ajax({
            type: "POST",
            url: "api/Users",
            data: {
                firstname: $("#givenName").val(),
                lastname: $("#surname").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                ccprovider: $("#ccProvider").val(),
                ccnumber: $("#ccNumber").val(),
            },
            success:function(json){
                $.ajax({
                    type: "POST",
                    url: "api/Login",
                    data: {
                        email: $("#email").val(),
                        password: $("#password").val()
                    },
                    success: function(json){
                       window.location = "orderpage.html";
                        
                    }
            });
                $("#email").val("");
                $("#password").val("");
                $("#surname").val("");
                $("#givenName").val("");
                $("#confirmPassword").val("");
                $("#ccNumber").val("");
                $("#ccProvider #Visa").prop("selected",true);
                $("#signIn").css("display", "none");
                $("#signedIn").css("display", "block");
                
        }});
    }
}

function signIn(){
    event.preventDefault();
    $.ajax({
            type: "POST",
            url: "api/Login",
            data: {
                email: $("#signInEmail").val(),
                password: $("#signInPass").val()
            },
            success: function(json){
                console.log(json);
                if(json === null){
                    alert("The information entered was not correct. Try Again.");
                }
                else{
                    $("#email").val("");
                    $("#password").val("");

                    window.location = "orderpage.html";

                }

            }
    });
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

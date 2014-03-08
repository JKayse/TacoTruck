// JavaScript Document

$(document).ready(function() {
    $("header").load("Header.html");
    $(document).on('click', "header img", goToHomePage);
    $(document).on('click', "header h1", goToHomePage);
    $(document).on('click', "#homepage", goToHomePage);
    $(document).on('click', "#guestOrder", goToOrderPage);
    $(document).on('click', "#locations", goToMap);
    $(document).on('click', "#signUp", signUp);
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

function signUp(){
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("confirmPass").value;

    if(password !== cpassword){
        alert("Passwords do not match. Try again.");
    }
    else{
        $.ajax({
            type: "POST",
            url: "api/AddUser",
            data: {
                givenName: $("#givenName").val(),
                surname: $("#surname").val(),
                emailAddress: $("#email").val(),
                password: $("#password").val(),
                cc_provider: $("#ccProvider").val(),
                cc_number: $("#ccNumber").val(),
            },
            success:function(json){
            if(json === null){
                alert("Please enter valid information. Try again.");
            }
            else{
                json = JSON.parse(json);
                $("#email").val("");
                $("#password").val("");
                $("#signIn").css("display", "none");
                $("#signedIn").css("display", "block");
                addUser();
            }
        }});
    }
    window.location = "orderpage.html";
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

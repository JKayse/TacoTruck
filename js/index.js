// JavaScript Document

$(document).ready(function() {
    $("header").load("Header.html");
    $(document).on('click', "header img", goToHomePage);
    $(document).on('click', "header h1", goToHomePage);
    $(document).on('click', "#homepage", goToHomePage);
    $(document).on('click', "#guestOrder", goToOrderPage);
    $(document).on('click', "#locations", goToMap);
    $(document).on('click', "#signUp", signUp);
    $(document).on('click', "header #signIn button", signIn);
    $(document).on('click', "header #signedIn a", signOut);
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
                givenName: $("#givenName").val(),
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
                $("#signInEmail").val("");
                $("#signInPass").val("");
                $("#signIn").css("display", "none");
                $("#signedIn").css("display", "block");
                addUser();
            }
            }
    }});
    
    window.location = "orderpage.html";
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
                    window.location = "orderpage.html";

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

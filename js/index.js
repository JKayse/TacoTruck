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

function signUp{
    $.ajax({
            type: "POST",
            url: "api/",
            data: {
                user: addUser();
            }
    });
    window.location = "orderpage.html";
}

function signIn{
    $.ajax({
            type: "POST",
            url: "api/",
            data: {
                user: login();
            }
    });
    window.location = "orderpage.html";
}

function signOut{

}

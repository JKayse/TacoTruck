var geocoder;
var map;
var word;
function initialize() {
  var mapOptions = {
          center: new google.maps.LatLng(32.7758, -96.7967),
          zoom: 12,
          styles:[{"featureType":"landscape","stylers":[{"color":"#6c8080"},{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","stylers":[{"color":"#d98080"},{"hue":"#eeff00"},{"lightness":100},{"weight":1.5}]}]

  };

   map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);









  geocoder = new  google.maps.Geocoder();

  
}

  function codeAddress(address, words) {
    
    geocoder.geocode( { 'address': address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: "img/taco_icon.png",
             title: words
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }

        map.setCenter(new google.maps.LatLng(32.7758, -96.7967));
        map.setZoom(11);
    });
  }

initialize();




$(document).ready(function() {
    $("header").load("Header.html");
    $(document).on('click', "header img", goToHomePage);
    $(document).on('click', "header h1", goToHomePage);
    $(document).on('click', "#signOut", signout);
    $(document).on('submit', "#signInArea", signIn);
    $.ajax({url:"api/LoginStatus", success: function(json){
            if(json !== 'null'){
                $("#signedIn h2").html("Welcome!");
                $("#signInEmail").val("");
                $("#signInPass").val("");
                $("#orderPrevious").css("display", "block");
                $("#signIn").css("display", "none");
                $("#signedIn").css("display", "block");                
            }
            else{
                return;
            }
        }});  
  


 $.ajax({url:"api/Locations", success: function(json){
        word = JSON.parse(json).Locations;
       
          var  textout ="";
        for(var i = 0; i < word.length ; i++){
          console.log(json.length);
          codeAddress(word[i].Address + " " + word[i].City , word[i].Name);

          textout = textout + "<h4>" + word[i].Name + "</h4>" + word[i].Address +"</br>"+ word[i].City +" ,"+ word[i].State +" "+ word[i].Zipcode + "</br>" ; 

        }

        document.getElementById("names").innerHTML = textout;

    }});
 });



function goToHomePage(){
    window.location = "index.html";
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
                    
                    json = JSON.parse(json);
                    $("#signInEmail").val("");
                    $("#signInPass").val("");
                    $("#orderPrevious").css("display", "block");
                    $("#signIn").css("display", "none");
                    $("#signedIn").css("display", "block");
                    $("#signedIn h2").html("Welcome!");

                }

            }
    });
}
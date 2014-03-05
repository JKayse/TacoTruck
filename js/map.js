var geocoder;

function initialize() {
  var mapOptions = {
          center: new google.maps.LatLng(32.7758, -96.7967),
          zoom: 10
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  geocoder = new  google.maps.Geocoder();

  var hardCoded = [
  {
    "name": "Klyde Warren Park",
    "address": "2012 Woodall Rodgers Fwy",
    "city": "Dallas",
    "state": "TX",
    "zipcode": 75201
  },
  {
    "name": "Southern Methodist Unversity",
    "address": "6425 Boaz Lane",
    "city": "Dallas",
    "state": "TX",
    "zipcode": 75205
  },
  {
    "name": "Addison Circle Park",
    "address": "Addison Circle",
    "city": "Addison",
    "state": "TX",
    "zipcode": 75001
  },
  {
    "name": "Truck Yard",
    "address": "5624 Sears St",
    "city": "Dallas",
    "state": "TX",
    "zipcode": 75206
  },
  {
    "name": "Deep Ellum",
    "address": "2630 Commerce St",
    "city": "Dallas",
    "state": "TX",
    "zipcode": 75226
  }
]
/*var tempArrayOfLocations= [
[32.842856, -96.784932],
[32.781630, -96.804416],
[32.790523, -96.796605],
[32.743665, -96.726696],
];
*/

var tempArrayOfLocations = new Array();

for( var z= 0; z < hardCoded.length; z++){
codeAddress(hardCoded[z]);
}


//setMarkers(tempArrayOfLocations, map);
  
}

  function codeAddress(address) {
    
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }



function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
      'callback=initialize';
  document.body.appendChild(script);
}

function setMarkers(locations, map) {
 var shape = {
      coord: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
  };

  var temp;
  for(var i = 0; i < locations.length ; i++){
    temp = locations[i]
    var myLatLng = new google.maps.LatLng(temp[0], temp[1]);
     var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: "img/taco_icon.png"
  });

  }
}



window.onload = loadScript;
initialize();
setMarkers();
google.maps.event.addDomListener(window, 'load', initialize);
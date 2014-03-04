function initialize() {
  var mapOptions = {
          center: new google.maps.LatLng(32.7758, -96.7967),
          zoom: 10
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

var tempArrayOfLocations= [
[32.842856, -96.784932],
[32.781630, -96.804416],
[32.790523, -96.796605],
[32.743665, -96.726696],
];

setMarkers(tempArrayOfLocations, map);

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
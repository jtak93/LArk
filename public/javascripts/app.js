var myLocation;
var map;

// TODO DISTRACT USER WHILE MAP IS LOADING AND CENTERING
// navigator.geolocation.watchPosition(function(obj){
//   myLocation = {lat: obj.coords.latitude, lng: obj.coords.longitude};
//   initMap(myLocation);
// });

navigator.geolocation.watchPosition(function(obj){
  myLocation = {lat: obj.coords.latitude, lng: obj.coords.longitude};
  console.log(myLocation);
  if (map){
    map.panTo(myLocation);
  } else {
    console.log('map doesnt exist yet');
  }
});

$(document).ready(function(){
  var socket = io();
  // send test event to server
  socket.emit('test', {test: "testobject"});
  // receive response from server
  socket.on('test', function(data){
    console.log(data);
  });
});

$(document).ready(function(){
  $('#plus').on('click', function(){
    $('.submit-data').removeClass('hidden');
  });
});

// fake db
var places = [
  {
    "latitude": 34.030935,
    "longitude": -118.26663732
  },
  {
    "latitude": 34.0305689,
    "longitude": -118.2663225
  }
];


function initMap() {
  // TODO: need to dynamically change myLocation using location services
  var startLocation = {lat: 34.030935, lng: -118.266637};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: startLocation
  });
  // loop through fake db and mark each place
  places.forEach(function(place){
    console.log(place);
    var latLng = {lat: place.latitude, lng: place.longitude};
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    console.log(marker);
  });

  // Geocoder
  var geocoder = new google.maps.Geocoder();
  // Click event to go to address
  document.getElementById('getAddress').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    // use results[0].geometry.location.lat(), results[0].geometry.location.lng() to get lat/long
    console.log(results[0].geometry.location.lat());
    console.log(results[0].geometry.location.lng());
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}





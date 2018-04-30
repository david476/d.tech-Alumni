//TODO Implement maps: https://developers.google.com/maps/documentation/javascript/marker-clustering

function initMap() {
  
  //getData(function(Data){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: 37.533034, lng: -122.264452}
  });
  
  
  getData(function(data){
    for(var i in data){
      var place = data[i];

      var marker = new google.maps.Marker({
        position: place.location,
        //label: "BU",
        map: map
      });
      
      addInfoWindow(marker, place);
    }
  });
}

function addInfoWindow(marker, place) {
  var text = place.name;
  for(var i in place.alumni) {
    var alumn = place.alumni[i];
    text += '<br>- ' + alumn.name + ' \'' + alumn.year;
  }

  var infoWindow = new google.maps.InfoWindow({
    content: text,
    position: place.location
  });
  
  marker.addListener("click",function(){ 
    infoWindow.open(map, marker);
  }); 
}


//Attempt to retrieve and parse the database from GitHub. Argument is a callback function that gets passed the parsed JSON (an array).
function getData(callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      try {
        callback(JSON.parse(xmlHttp.responseText));
      }catch(e) {
        console.error("Parse failed: ", xmlHttp, e);
      }
    }
  }
  xmlHttp.open("GET", "/alumni_info.json", true); // true for asynchronous 
  xmlHttp.send(null);
}

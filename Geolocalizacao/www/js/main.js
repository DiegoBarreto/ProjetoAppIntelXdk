var _map = null;
var _seconds = 30;
var _llbounds = null;
var myLatLng;
var oldLatLng = "";
var boolTripTrack = true;

function drawMap() {
    var latlng = new google.maps.LatLng(currentLatitude, currentLongitude);
    myLatLng = latlng;
    var mapOptions = {
        center: latlng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_TOP
        }
    };
    if (boolTripTrack === true) {
        if(google.maps){
            _map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        }
        
        else {
            alert("Unable to display map.");
        }
    }
}
var currentLatitude = "40.713768";
var currentLongitude = "-73.016696";
var options = {
    timeout: 10000,
    maximumAge: 11000,
    enableHighAccuracy: true
};
var suc = function(p) {
        console.log("geolocation success", 4);
        if (_map === null) {
            currentLatitude = p.coords.latitude;
            currentLongitude = p.coords.longitude;
            drawMap();
        } else {
            myLatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        }
        if ((myLatLng.toString().localeCompare(oldLatLng.toString())) !== 0) {
            var Marker = new google.maps.Marker({
                position: myLatLng,
                map: _map
            });
            if (_llbounds === null) {
                _llbounds = new google.maps.LatLngBounds(new google.maps.LatLng(p.coords.latitude, p.coords.longitude)); //original
            } else {
                _llbounds.extend(myLatLng);
            }
            _map.fitBounds(_llbounds);
        }
        oldLatLng = myLatLng;
    };
var fail = function() {
        console.log("Geolocation failed. \nPlease enable GPS in Settings.", 1);
    };
var getLocation = function() {
        console.log("in getLocation", 4);
    };

function onDeviceReady() {
    try {
        if (navigator.geolocation !== null) {
            document.getElementById("map_canvas").style.height = screen.height + "px";
            navigator.geolocation.watchPosition(suc, fail, options);
        }
        else {
            alert("navigator.geolocation == null")
        }
    } catch (e) {
        alert(e.message);
    }

    try {
        navigator.splashscreen.hide(); 
    } catch (e) {}
}
document.addEventListener("deviceready", onDeviceReady, false);
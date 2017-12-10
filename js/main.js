alert("Please allow access your location");



function init() {
    // Default position
    var centerpos = new google.maps.LatLng(37.76904,-122.483519);


    // default options for the google map
    var optionsGmaps = {
      center:centerpos,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 15
    };


    // Init map object
    var map = new google.maps.Map(document.getElementById("map"), optionsGmaps);



      // callback function, called by getCurrentPosition() in case of success
      function success(position) {

        var infopos = "These are your coordinates!<br>";
	        infopos += "Latitude : "+position.coords.latitude + " " + "Longitude: "+position.coords.longitude+"<br>" + " " + "Altitude : "+position.coords.altitude +"<br>";
        document.getElementById("myposition").innerHTML = infopos;

        

        // Make new object LatLng for Google Maps
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // Add a marker at position
        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title:"You are here"
        });

          // center map on longitude and latitude
        map.panTo(latlng);
      }

      // callback function, called by getCurrentPosition() in case of error
      function error(error) {
        var info = "Error during location : ";
        switch(error.code) {
        case error.TIMEOUT:
          info += "Timeout !";
        break;
        case error.PERMISSION_DENIED:
          info += "You did not access your location";
        break;
        case error.POSITION_UNAVAILABLE:
          info += "Position could not be determined";
        break;
        case error.UNKNOWN_ERROR:
          info += "Unknown error";
        break;
        }
        document.getElementById("myposition").innerHTML = info;
      }
  
      // Ask browser for the current position
      // success and error are callbacks functions
      navigator.geolocation.getCurrentPosition(success, error);
    } 
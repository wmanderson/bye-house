$(document).ready(function() {

    // Home location 37.7721021,-122.4376155
    // Work Location 37.762522, -122.415148
    // transit

    // https://maps.googleapis.com/maps/api/directions/json?parameters
    // arrival_time
    // Declare variables



    $.validate({
        modules: 'date',
    });

    var name = document.getElementById('name').value;
    var time = document.getElementById('time').value;
    var ampm = document.getElementById('ampm').value;
    var coffee = document.getElementById('coffee').value;
    var demoMode = document.getElementById('demoMode').value;



    // var a = moment();
    // var b = moment('time' 'ampm', "YYYY-MM-DD h:mm a");
    // console.log(b)




    //
    // var arrivalTime = b;
    // console.log(arrivalTime);

    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: "296 Divisadero St, San Francisco, CA 94117",
        destination: "2170 Folsom Street, San Francisco, CA",
        travelMode: google.maps.DirectionsTravelMode.TRANSIT,
        transitOptions: {
            arrivalTime: new Date(findTime())
        },
        unitSystem: google.maps.UnitSystem.METRIC


    };


    directionsService.route(directionsRequest, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //HERE IS THE INFO YOU NEED
            console.log(response.routes[0].legs[0].arrival_time.text);
        } else {
            alert("We had trouble loading route data from Google");
        }
    })


    // Define functions
    function nextBus() {
        $.ajax({
            type: "GET",
            url: "http://restbus.info/api/agencies/sf-muni/stops/14620/predictions",
            async: true,
            success: function(predictions) {
                var leaveTime = predictions[0].values[0].minutes;
                $("#leave").html(leaveTime);
                if (leaveTime === 1) {
                    $("#min").html("minute");
                } else {
                    $("#min").html("minutes");
                }
            },
            error: function() {
                alert("Error getting data");
            }
        });
    }

    function fillForm(id, v) {
      var v = localStorage.getItem(v);
      if (v != "undefined" || v != "null") {
        $(id).val( v );
      } else {
          document.getElementById(id).innerHTML = "";
      }
    }


    function findTime() {

      // Construct today's date
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      todayDate = year + "/" + month + "/" + day;
      return todayDate;

      var time = localStorage.getItem("time");
      var ampm = localStorage.getItem("ampm");
      var a = moment();
      var d = moment(todayDate + " " + time + " " + ampm);

      if (moment(d).isBefore(a)) {
        var d = moment(d).add(1, 'day');
        // var t = moment(t).format("x")
        var d = moment(d).format("x");
        return d;
      } else {
        // convert variable to new format
        var d = moment(d).format("x");
        return d;
      }
  }

    findTime();



    nextBus();
    setInterval(nextBus, 5000);



    // Fill form

    fillForm("#name","name");
    fillForm("#time","time");
    fillForm("#ampm","ampm");
    fillForm("#coffee","coffee");
    fillForm("#demoMode","demoMode");


    // Define Events -->

    // Toggle site nav on click of "site header toggle"
    $(document).on("click", ".site-header__toggle", function() {
        $(".site-header").toggleClass("site-header--active");
    });

    // 1. If form is filled, save info locally
    if (localStorage) {

      // Add an event listener for form submissions
      document.getElementById('myForm').addEventListener('submit', function(e) {
        event.preventDefault();
        // Get the value of the name field.
        var name = document.getElementById('name').value;
        var time = document.getElementById('time').value;
        var ampm = document.getElementById('ampm').value;
        var coffee = document.getElementById('coffee').value;
        var demoMode = document.getElementById('demoMode').value;
        // Save the name in localStorage.
        localStorage.setItem('name', name);
        localStorage.setItem('time', time);
        localStorage.setItem('ampm', ampm);
        localStorage.setItem('coffee', coffee);
        localStorage.setItem('demoMode', demoMode);
        // Toggle Menu
        $(".site-header").toggleClass("site-header--active");

      });
    }


    // 2. Clear local storage
    document.getElementById('myForm').addEventListener('reset', function() {
      localStorage.clear();
    });


});

// _epochTime Unix time — google

// Cookies
// https://plugins.jquery.com/cookie/
//

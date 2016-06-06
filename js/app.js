$(document).ready(function() {

    // Home location 37.7721021,-122.4376155
    // Work Location 37.762522, -122.415148
    // transit

    // https://maps.googleapis.com/maps/api/directions/json?parameters
    // arrival_time
    // Declare variables

    var leaveTime;
    var arrivalTime;
    var etaTime;
    var firstName;
    var amWeather;
    var pmWeather;
    var firstMeeting;
    var load;

    $.validate({
        modules: 'date',
    });



    // Fill in form
    var name = localStorage.getItem('name');
    if (name != "undefined" || name != "null") {
      $( "#name").val( name );
    } else {
        document.getElementById('name').innerHTML = "";
    }


    var time = localStorage.getItem('time');
    if (time != "undefined" || time != "null") {
      $( "#time").val( time );
      console.log(time)
    } else {
        document.getElementById('time').innerHTML = "";
    }




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

    nextBus();
    setInterval(nextBus, 5000);


    // Define Events
    $(document).on("click", ".site-header__toggle", function() {
        $(".site-header").toggleClass("site-header--active");
    });

    // Define Events
    if (localStorage) {

      // Add an event listener for form submissions
      document.getElementById('myForm').addEventListener('submit', function() {
        // Get the value of the name field.
        var name = document.getElementById('name').value;
        var time = document.getElementById('time').value;

        // Save the name in localStorage.
        localStorage.setItem('name', name);
        localStorage.setItem('time', time);
      });
    }
});

// _epochTime Unix time — google

// Cookies
// https://plugins.jquery.com/cookie/
//

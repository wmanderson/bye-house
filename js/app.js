$(document).ready(function() {

    checkTime();
    findTime();

    $.validate({
        modules: 'date',
    });

    var name = document.getElementById('name').value;
    var time = document.getElementById('time').value;
    var ampm = document.getElementById('ampm').value;
    var coffee = document.getElementById('coffee').value;
    var demoMode = document.getElementById('demoMode').value;

    console.log(coffee);
    console.log(ampm);




    // Calculate when to leave house based on gmap data
    function checkTime() {

      var directionsService = new google.maps.DirectionsService();
      var directionsRequest = {
          origin: "296 Divisadero St, San Francisco, CA 94117",
          destination: "2170 Folsom Street, San Francisco, CA",
          travelMode: google.maps.DirectionsTravelMode.TRANSIT,
          transitOptions: {
              arrivalTime: new Date(parseInt(findTime()))
          },
          unitSystem: google.maps.UnitSystem.METRIC
      };

    directionsService.route(directionsRequest, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Define Variables Based on Gmap Data
            var arrivalTime = (response.routes[0].legs[0].arrival_time.text);
            var arrivalTime = moment(arrivalTime, "hh-mm a").format("h:mm a");
            var departTime = (response.routes[0].legs[0].departure_time.text);
            var departValue = (response.routes[0].legs[0].departure_time.value);
            console.log(response);
            if (coffee === "yesCoffee") {
              departTime = moment(departTime, "hh-mm a").subtract(5, 'm').format("h:mm a");
              console.log(departTime);
              $("#leaveStamp").html(departTime);
            } else {
              departTime = (response.routes[0].legs[0].departure_time.text);
              return(departTime);
              $("#leaveStamp").html(departTime);
            }
            $("#arrival").html(arrivalTime);
        } else {
            alert("We had trouble loading route data from Google");
        }
        if (5===5) {
            departimeCount = new Date(departValue)
            $('#countdownDefault').countdown({until: departimeCount,
              format: 'yowdHMS',
              layout: '{d<}{dn} {dl}{d>} {h<}{hn} {hl}{h>},  {m<}{mn} {ml}{m>}, and {sn} {sl}'});
        } else {
            departimeCount = new Date(departValue - 5 * 60000)
            $('#countdownDefault').countdown({until: departimeCount,
              format: 'yowdHMS',
              layout: '{d<}{dn} {dl}{d>} {h<}{hn} {hl}{h>},  {m<}{mn} {ml}{m>}, and {sn} {sl}'});
        }
    })
  }


    function fillForm(id, v) {
        var v = localStorage.getItem(v);
        if (v != "undefined" || v != "null") {
            $(id).val(v);
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
        var time = localStorage.getItem("time");
        var ampm = localStorage.getItem("ampm");
        var a = moment();
        var d = moment(todayDate + " " + time + " " + ampm);

        if (moment(d).isBefore(a)) {
            var d = moment(d).add(1, 'day');
            // var t = moment(t).format("x")
            var d = moment(d).format("x");
            console.log(d);
            return d;
        } else {
            // convert variable to new format
            var d = moment(d).format("x");
            console.log(d);
            return d;
        }
    }



    // Fill form

    fillForm("#name", "name");
    fillForm("#time", "time");
    fillForm("#ampm", "ampm");
    fillForm("#coffee", "coffee");
    fillForm("#demoMode", "demoMode");


    // Define Events -->

    // Toggle site nav on click of "site header toggle"
    $(document).on("click", ".site-header__toggle", function() {
        checkTime();
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


// // Define functions
// function nextBus() {
//     $.ajax({
//         type: "GET",
//         url: "http://restbus.info/api/agencies/sf-muni/stops/14620/predictions",
//         async: true,
//         success: function(predictions) {
//             var leaveTime = predictions[0].values[0].minutes;
//             $("#leave").html(leaveTime);
//             if (leaveTime === 1) {
//                 $("#min").html("minute");
//             } else {
//                 $("#min").html("minutes");
//             }
//         },
//         error: function() {
//             alert("Error getting data");
//         }
//     });
// }

//
// nextBus();
// setInterval(nextBus, 5000);
//

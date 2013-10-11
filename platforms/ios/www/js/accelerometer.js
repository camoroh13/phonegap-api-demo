
jqmReady = $.Deferred();

$(document).on("pageinit",  "#accelerometer", function(event, ui) {
    jqmReady.resolve();
});
/**
 * General initialization.
 */
$.when(jqmReady, pgReady).then(function() {
    startWatch()
    console.log("Frameworks ready.");
});


// The watch id references the current `watchAcceleration`
var watchID = null;

// Start watching the acceleration
//
function startWatch() {

    // Update acceleration every 3 seconds
    var options = { frequency: 3000 };

    if (window.cordova) {
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }
}

// Stop watching the acceleration
//
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}


function onSuccess(acceleration) {
    $("#accX").text( acceleration.x );
    $("#accY").text( acceleration.y );
    $("#accZ").text( acceleration.z );
    $("#accTime").text( acceleration.timestamp );
};

function onError() {
    $("#accelerationError").append('onError!');
};


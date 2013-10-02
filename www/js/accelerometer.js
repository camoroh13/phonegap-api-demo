/**
 * @author: Chris Hjorth, www.chrishjorth.com
 */
var jqmReady = $.Deferred();
var pgReady = $.Deferred();
var accelerometer = {
    //Callback for when the app is ready
    callback: null,
    //Flag for separating web and PhoneGap environments
    isWeb: true,
    // Application Constructor
    initialize: function(callback) {
        this.callback = callback;
        var browser = document.URL.match(/^https?:/);
        if(browser) {
            //In case of web we ignore PG but resolve the Deferred Object to trigger initialization
            pgReady.resolve();
        }
        else {
            this.bindEvents();
        }
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        // The scope of 'this' is the event, hence we need to use app.
        accelerometer.receivedEvent('deviceready');
    },
    receivedEvent: function(event) {
        switch(event) {
            case 'deviceready':
                pgReady.resolve();
                break;
        }
    }
};
$(document).on("pageinit",  "#accelerometer", function(event, ui) {
    jqmReady.resolve();
});
/**
 * General initialization.
 */
$.when(jqmReady, pgReady).then(function() {
    //Initialization code here
    if(accelerometer.callback) {
        accelerometer.callback();
    }
    console.log("Frameworks ready.");
});

accelerometer.initialize(function() {
    startWatch();
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


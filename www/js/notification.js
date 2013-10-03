/**
 * @author: Chris Hjorth, www.chrishjorth.com
 */
var jqmReady = $.Deferred();
var pgReady = $.Deferred();
var notification = {
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
        notification.receivedEvent('deviceready');
    },
    receivedEvent: function(event) {
        switch(event) {
            case 'deviceready':
                pgReady.resolve();
                break;
        }
    }
};
$(document).on("pageinit",  "#notification", function(event, ui) {
    jqmReady.resolve();
});
/**
 * General initialization.
 */
$.when(jqmReady, pgReady).then(function() {
    //Initialization code here
    if(notification.callback) {
        notification.callback();
    }
    console.log("Frameworks ready.");
});

notification.initialize(function() {
    $("#alert").bind("tap", function() {
        if (window.cordova) {
            showAlert();
        }
    });

    $("#confirm").bind("tap", function() {
        if (window.cordova) {
            showConfirm();
        }
    });

    $("#prompt").bind("tap", function() {
        if (window.cordova) {
            showPrompt();
        }
    });

});

// alert dialog dismissed
function alertDismissed() {
    $("#alert .ui-btn-text  ").text("Notified");
}

// Show a custom alertDismissed
//
function showAlert() {
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
}

// process the confirmation dialog result
function onConfirm(buttonIndex) {
    $("#confirm .ui-btn-text  ").text('You selected button ' + buttonIndex);
}

// Show a custom confirmation dialog
//
function showConfirm() {
    navigator.notification.confirm(
        'You are the winner!', // message
        onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        'Restart,Exit'         // buttonLabels
    );
}

// process the promp dialog results
function onPrompt(results) {
    if (results.buttonIndex == 2) {
        $("#prompt .ui-btn-text  ").text("Canceled");
    } else {
        $("#prompt .ui-btn-text  ").text(results.input1);
    }
}

// Show a custom prompt dialog
//
function showPrompt() {
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // callback to invoke
        'Registration',            // title
        ['Ok','Cancel'],             // buttonLabels
        'Jane Doe'                 // defaultText
    );
}
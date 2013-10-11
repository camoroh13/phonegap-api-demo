
var jqmReady = $.Deferred();

$(document).on("pageinit",  "#notification", function(event, ui) {
    jqmReady.resolve();
});
/**
 * General initialization.
 */
$.when(jqmReady, pgReady).then(function() {
    //Initialization code here
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

    $("#beep").bind("tap", function() {
        if (window.cordova) {
            playBeep();
        }
    });

    $("#vibrate").bind("tap", function() {
        if (window.cordova) {
            vibrate();
        }
    });
    console.log("Frameworks ready.");
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
    if (buttonIndex == 1) {
        $("#confirm .ui-btn-text  ").text('You selected Restart');
    } else {
        $("#confirm .ui-btn-text  ").text('You selected Exit');
    }
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

// Beep three times
//
function playBeep() {
    navigator.notification.beep(3);
}

// Vibrate for 2 seconds
//
function vibrate() {
    navigator.notification.vibrate(2000);
}
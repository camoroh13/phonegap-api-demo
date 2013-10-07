/**
 * @author: Chris Hjorth, www.chrishjorth.com
 */
var jqmReady = $.Deferred();
var pgReady = $.Deferred();

var pictureSource;   // picture s
var destinationType; // sets the format of returned valueource
var inage;

var camera = {
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
        camera.receivedEvent('deviceready');
    },
    receivedEvent: function(event) {
        switch(event) {
            case 'deviceready':
                pgReady.resolve();
                break;
        }
    }
};
$(document).on("pageinit",  "#camera", function(event, ui) {
    jqmReady.resolve();
    image = $("#image");
});
/**
 * General initialization.
 */
$.when(jqmReady, pgReady).then(function() {
    //Initialization code here
    if(camera.callback) {
        camera.callback();
    }
    console.log("Frameworks ready.");
});

camera.initialize(function() {
    if (window.cordova) {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
    //$("#image").attr("src", "http://html5hu.files.wordpress.com/2011/10/phonegap-supported-features-4-oct-2011.jpg   ");

    $("#capturePhoto").bind("tap", function() {
        if (window.cordova) {
            capturePhoto();
        }
    });

    $("#captureEditable").bind("tap", function() {
        if (window.cordova) {
            capturePhotoEdit();
        }
    });

    $("#fromPhotoLibrary").bind("tap", function() {
        if (window.cordova) {
            getPhoto(pictureSource.PHOTOLIBRARY);
        }
    });

    $("#fromPhotoAlbum").bind("tap", function() {
        if (window.cordova) {
            getPhoto(pictureSource.SAVEDPHOTOALBUM);
        }
    });
});

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    $("#image").attr("src",  "data:image/jpeg;base64," + imageData);
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    $("#image").attr("src",  imageURI);
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}


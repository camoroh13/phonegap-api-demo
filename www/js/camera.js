
var pictureSource;   // picture s
var destinationType; // sets the format of returned valueource
jqmReady = $.Deferred();

$(document).on("pageinit",  "#camera", function(event, ui) {
    jqmReady.resolve();
    image = $("#image");
});
/**
 * General initialization.
 */
$.when(jqmReady, pgReady).then(function() {
    //Initialization code here

        if (window.cordova) {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        }

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

    console.log("Frameworks ready.");
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


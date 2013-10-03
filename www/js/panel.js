$(document).on("pageshow", "[data-role='page']", function () {

    var viewport = {
        width: $(window).width(),
        height: $(window).height()
    };
    var id = $(this).attr("id");

    if (window.innerWidth > 560) {
        window.setTimeout(function() {
            openPanel("#panel-" + id);
        }, 5);
    }

});

$(document).on("pageshow", "[data-role='page']", function () {
    var id = $(this).attr("id");
    if ($.mobile.activePage.jqmData("panel-" + id) !== "open") {
       // $("#panel-" + id).panel("open");
    }

});

$(document).on("pagecreate", "#index", function () {
    createPanel("index");
    createMenuButton("index");
});

$(document).on("pagecreate", "#accelerometer", function () {
    createPanel("accelerometer");
    createMenuButton("accelerometer");
});

$(document).on("pagecreate", "#camera", function () {
    createPanel("camera");
    createMenuButton("camera");
});

$(document).on("pagecreate", "#capture", function () {
    createPanel("capture");
    createMenuButton("capture");
});

function createMenuButton (id) {

    var menuButton = $("<a/>", {
        href : "#panel-" + id,
        class : "ui-btn-left",
        role: "button"
    });
    menuButton.attr("data-icon", "bars");
    menuButton.attr("data-role", "button");
    menuButton.attr("data-iconpos", "notext");
    menuButton.text("Menu");
    $("#" + id +" :jqmData(role='header')").append(menuButton);
}

function createPanel(id) {
    var panel = $("<div/>", {
        id: "panel-" + id
    });
    panel.attr("data-role", "panel");
    panel.attr("data-theme", "b");

    var menu = $("<ul/>");
    menu.attr("data-role", "listview");
    var items = [{link: "accelerometer.html", text: "Accelerometer"},
                    {link: "camera.html", text: "Camera"},
                    {link: "capture.html", text : "Capture"},
                    {link: "notification.html", text: "Notification"}];
    for (item in items) {
        var li = $("<li/>");
        var a = $("<a/>", {
            href: items[item].link
        });
        a.text(items[item].text);
        li.append(a);
        menu.append(li);
    }

    panel.append(menu);
    $("#"+id).append(panel);

    $(document).on("swiperight", "#" + id, function (e) {

        if ($.mobile.activePage.jqmData("panel-" + id) !== "open") {
            $("#panel-" + id).panel("open");
        }
    });

}
function openPanel(id) {
    $(id).panel("open");
}
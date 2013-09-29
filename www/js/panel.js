$(document).on("pageinit", function () {

    var viewport = {
        width: $(window).width(),
        height: $(window).height()
    };

    console.log(viewport.width);
    if (window.innerWidth > 560) {
        window.setTimeout(openPanel, 1);
    }

});

$(document).on("pagecreate", "#index", function () {
    createPanel();
    createMenuButton();
    $(document).on("swiperight", "#index", function (e) {

        if ($.mobile.activePage.jqmData("panel") !== "open") {
            $("#panel").panel("open");
        }
    });
});

$(document).on("pagecreate", "#accelerometer", function () {
    createPanel();
    createMenuButton();
});

$(document).on("pagecreate", "#capture", function () {
    createPanel();
    createMenuButton();
});

function createMenuButton () {
    var menuButton = $("<a/>", {
        href : "#panel",
        class : "ui-btn-left",
        role: "button"
    });
    menuButton.attr("data-icon", "bars");
    menuButton.attr("data-role", "button");
    menuButton.attr("data-iconpos", "notext");
    menuButton.text("Menu");
    $(":jqmData(role='header')").append(menuButton);
}

function createPanel() {
    var panel = $("<div/>", {
        id: "panel"
    });
    panel.attr("data-role", "panel");

    var menu = $("<ul/>");
    menu.attr("data-role", "listview");
    var items = [{link: "accelerometer.html", text: "Accelerometer"},
                    {link: "#", text: "Camera"},
                    {link: "capture.html", text : "Capture"}];
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
    $(":jqmData(role='page')").append(panel);
}

function closePanel() {
    $("#panel").panel("close");
}
function openPanel() {
    $("#panel").panel("open");
}
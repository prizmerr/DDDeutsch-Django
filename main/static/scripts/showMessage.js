let messageTimeout;
function showMessage(text, cookie = false) {
    clearTimeout(messageTimeout);
    $("#messWind").fadeOut();

    let messWind;
    const closeWind = $("<button>", {
        type: "button",
        class: "btn-close",
        id: "closeWind",
        onclick: "$('#messWind').fadeOut();",
        style: "float: right"
    });

    if ($("#messWind").length == 0) {
        messWind = $("<div>", {
            id: "messWind"
        });
        messWind.append(closeWind);
        messWind.append(`<span>${text}</span>`);

        $("body").append(messWind);
    } else {
        messWind = $("#messWind");

        messWind.text("");
        messWind.append(closeWind);
        messWind.append(`<span>${text}</span>`);
    }

    messWind.fadeIn();
    if (!cookie) {
        messageTimeout = setTimeout(() => {
            messWind.fadeOut();
        }, 3000);
    } else {
        $.get("/setCookie", (data) => console.log(data));
    }
}
function passWindow(click) {
    closeWindows();

    const window = $("<div>", {
        id: "passwordWindow",
        class: "windows"
    });
    const closeButt = $("<button>", {
        type: "button",
        class: "btn-close",
        id: "closeButt",
        onclick: "$('#passwordWindow').remove();"
    });

    const passDiv = $(`<div class="input-group mb-4">`);

    const pass = $("<input>", {
        id: "passwordInput",
        name: "password",
        type: "password",
        class: "form-control form-control-lg"
    });
    pass.attr("aria-describedby", "passEye");

    const eyeButt = $(`<button class="btn btn-outline-secondary" id="passEye"><img src="${eyeOpen}" id="passEyeImg"></button>`);

    const confirmButt = $("<button>", {
        id: "confirmPassButt",
        class: "btn btn-primary",
        text: "Подтвердить",
        onclick: click
    });

    passDiv.append(pass);
    passDiv.append(eyeButt);

    window.append(closeButt);
    window.append("<p>Введите пароль для продолжения:</p>");
    window.append(passDiv);
    window.append(confirmButt);

    $("body").append(window);
    if (isPhone) $("#passwordWindow").css("width", "85%");

    $("#passEye").click((e) => {
        e.preventDefault();
    
        if ($(".view").length == 0) {
            $("#passEye").addClass("view");
            $("#passEyeImg").attr("src", eyeClose);
            $("#passwordInput").attr("type", "text");
        } else {
            $("#passEye").removeClass("view");
            $("#passEyeImg").attr("src", eyeOpen);
            $("#passwordInput").attr("type", "password");
        }
    });
}
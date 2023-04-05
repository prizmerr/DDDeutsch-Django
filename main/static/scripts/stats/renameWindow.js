function renameWindow(click) {
    closeWindows();

    const window = $("<div>", {
        id: "renameWindow",
        class: "windows"
    });
    const closeButt = $("<button>", {
        type: "button",
        class: "btn-close",
        id: "closeButt",
        onclick: "$('#renameWindow').remove();"
    });

    const inp = $("<input>", {
        id: "renameInput",
        class: "form-control form-control-lg"
    });
    const confirmButt = $("<button>", {
        id: "confirmRenameButt",
        class: "btn btn-primary mg-top-3vh",
        text: "Переименовать",
        onclick: click
    });

    window.append(closeButt);
    window.append(inp);
    window.append(confirmButt);

    $("body").append(window);
    if (isPhone) $("#renameWindow").css("width", "85%");
}
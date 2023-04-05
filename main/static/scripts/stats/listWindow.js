function listWindow () {
    closeWindows();

    const window = $("<div>", {
        id: "newListWindow",
        class: "windows"
    });
    const closeButt = $("<button>", {
        type: "button",
        class: "btn-close",
        id: "closeButt",
        onclick: "$('#newListWindow').remove();"
    });

    const listName = $("<input>", {
        id: "listNameInput",
        name: "listName",
        class: "form-control form-control-lg",
        type: "text"
    });

    const saveButt = $("<button>", {
        class: "btn btn-primary mg-top-3vh",
        id: "saveListButt",
        text: "Создать",
        onclick: "saveList()"
    });

    window.append(closeButt);
    window.append("<p>Введите название списка:</p>");
    window.append(listName);
    window.append(saveButt);
    $("body").append(window);
    if (isPhone) $("#newListWindow").css("width", "85%");
}
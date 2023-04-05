let user_info;
let readyStats;

$.get(
    "/accActions/updateRepeatsInWeek",
    (data) => {
        if (data == "error") {
            showMessage("Не удалось получить с сервера информацию о статистике повторов за неделю.");
            readyStats = false;
        } else if (data == "unlogged") {
            document.location["href"] = "/";
        } else {
            user_info["repeatsInWeek"] = data["0"];
            readyStats = true;
        }
    }
);

$.get(
    "/accActions/getUserStats/",
    (data) => {
        if (data === "error") {
            showMessage("На сервере произошла ошибка.");
            throw new Error();
        }
        user_info = data;
        main();
    }
);

function main() {
    checkRepeats();

    $("#wordsBeingStudied").text(user_info["wordsBeingStudied"]);

    for (let i = 0; i < user_info["wordsListsNames"].length; i++) {
        createWordsBox(i);
    }

    const createNewListBox = $("<div>", {
        id: `createNewListBox`,
        class: `statsBoxes`
    });
    const createButt = $(`<button>`, {
        class: "btn btn-primary",
        text: "Создать новый список слов",
        onclick: "listWindow()"
    });

    createNewListBox.append(createButt);
    $("#mainBox").append(createNewListBox);
}

function checkRepeats() {
    if (readyStats !== undefined && readyStats === true) {
        canvasOn();
    } else if (readyStats === undefined) {
        setTimeout(() => {
            checkRepeats();
        }, 500);
    }
}

function createWordsBox(id) {
    const mainBox = $("<div>", {
        id: `wordsBox${id}`,
        class: `statsBoxes`
    });

    const openButton = $(`<button>`, {
        class: "btn btn-primary",
        text: user_info["wordsListsNames"][id]
    });
    openButton.attr("data-bs-toggle", "collapse");
    openButton.attr("data-bs-target", `#wordsTable${id}`);
    openButton.attr("aria-expanded", "false");
    openButton.attr("aria-controls", `#wordsTable${id}`);

    const wordsTable = $("<div>", {
        class: "collapse container wordsTables",
        id: `wordsTable${id}`
    });
    const titlesRow = $("<div>", {
        class: "row"
    });

    const titles = [
        $("<div class='col-sm'>Слово</div>"),
        $("<div class='col-sm'>Артикль</div>"),
        $("<div class='col-sm'>Перевод</div>"),
        $("<div class='col-sm'>Транскрипция</div>"),
        $("<div class='col-sm'>Пример использования</div>"),
        $("<div class='col-sm'>Количество повторов</div>"),
        $("<div class='col-sm'>Редактировать</div>")
    ];

    const newWordButt = $("<button>", {
        class: "btn btn-primary",
        id: "newWordButt",
        text: "Новое слово",
        onclick: `wordWindow(${id})`
    });
    const renameListButt =  $("<button>", {
        class: "btn btn-primary renameListButts",
        id:`renameListButt${id}`,
        text: "Переименовать список",
        onclick: `renameWindow("renameList(${id})")`
    });
    const deleteListButt = $("<button>", {
        class: "btn btn-danger deleteListButts",
        id:`deleteListButt${id}`,
        text: "Удалить список",
        onclick: `passWindow("deleteList(${id})")`
    });

    const blackLine = "<div class='row'><div class='col-sm blackLines'></div></div>";

    titlesRow.append(titles);
    wordsTable.append(titlesRow);
    wordsTable.append($(blackLine));

    for (let i = 0; i < user_info["wordsLists"][id].length; i++) {
        let list = user_info["wordsLists"][id][i];
        let row = $("<div>", {
            class: "row"
        });

        row.append(`<div class='col-sm'>${list["word"]}</div>`);
        row.append(`<div class='col-sm'>${list["article"]}</div>`);
        row.append(`<div class='col-sm'>${list["translate"]}</div>`);
        row.append(`<div class='col-sm'>${list["transcription"]}</div>`);
        row.append(`<div class='col-sm'>${list["example"]}</div>`);
        row.append(`<div class='col-sm'>${list["repeats"]}</div>`);
        row.append(`<div class='col-sm'><button class="btn btn-primary" onclick="wordWindow(${id}, ${i}, ${user_info["wordsLists"][id][i].id})">Редактировать</button></div>`);

        wordsTable.append(row);
        wordsTable.append($(blackLine));
    }

    wordsTable.append(newWordButt);
    wordsTable.append(renameListButt);
    wordsTable.append("<br>");
    wordsTable.append(deleteListButt);

    mainBox.append(openButton);
    mainBox.append(wordsTable);
    $("#mainBox").append(mainBox);
}

function closeWindows() {
    if ($("#newListWindow").length !== 0) {
        $("#newListWindow").remove();
    }
    if ($("#changeWordWindow").length !== 0) {
        $("#changeWordWindow").remove();
    }
    if ($("#passwordWindow").length !== 0) {
        $("#passwordWindow").remove();
    }
    if ($("#renameWindow").length !== 0) {
        $("#renameWindow").remove();
    }
}


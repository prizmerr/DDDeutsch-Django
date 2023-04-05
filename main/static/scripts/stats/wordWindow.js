function wordWindow(listId = "", wordId = "", id = "") {
    closeWindows();

    const window = $("<div>", {
        id: "changeWordWindow",
        class: "windows"
    });
    const closeButt = $("<button>", {
        type: "button",
        class: "btn-close",
        id: "closeButt",
        onclick: "$('#changeWordWindow').remove();"
    });

    const word = $("<input>", {
        id: "changeWordInput",
        name: "changeWord",
        class: "form-control form-control-lg",
        type: "text"
    });

    const fillButt = $("<button>", {
        class: "btn btn-primary mg-top-3vh",
        text: "Заполнить автоматически",
        onclick: "fillFields()",
        id: "fillButt",
        title: "Используется сервис Yandex.Translate"
    });

    const wordS = $("<input>", {
        id: "changeWordSInput",
        name: "changeWordS",
        class: "form-control form-control-lg",
        type: "text"
    });

    const articleDer = $("<input>", {
        name: "changeArticle",
        class: "form-check-label form-check-lg changeArticleInput",
        type: "radio",
        value: "der",
        id: "derRadio"
    });
    const articleDie = $("<input>", {
        name: "changeArticle",
        class: "form-check-label form-check-lg changeArticleInput",
        type: "radio",
        value: "die",
        id: "dieRadio"
    });
    const articleDas = $("<input>", {
        name: "changeArticle",
        class: "form-check-label form-check-lg changeArticleInput",
        type: "radio",
        value: "das",
        id: "dasRadio"
    });

    const derForm = $("<div class='form-check' id='derForm'></div>")
    const dieForm = $("<div class='form-check' id='dieForm'></div>")
    const dasForm = $("<div class='form-check' id='dasForm'></div>")

    const translate = $("<input>", {
        id: "changeTraslateInput",
        name: "changeTranslate",
        class: "form-control form-control-lg",
        type: "text"
    });

    const transcription = $("<input>", {
        id: "changeTranscriptionInput",
        name: "changeTranscription",
        class: "form-control form-control-lg",
        type: "text"
    });

    const example = $("<input>", {
        id: "changeExampleInput",
        name: "changeExample",
        class: "form-control form-control-lg",
        type: "text"
    });

    const exampleTranslate = $("<input>", {
        id: "changeExampleTInput",
        name: "changeExampleT",
        class: "form-control form-control-lg",
        type: "text"
    });

    const saveButt = $("<button>", {
        class: "btn btn-primary mg-top-3vh",
        id: "saveWordButt",
        onclick: `saveWord(${listId}, "${id}")`,
        text: "Сохранить"
    });

    const deleteButt = $("<button>", {
        class: "btn btn-danger mg-top-3vh",
        id: "deleteWordButt",
        onclick: `deleteWord(${listId}, "${id}")`,
        text: "Удалить слово"
    });


    window.append(closeButt);

    window.append("<p>Слово по-немецки (в ед.ч.):</p>");
    window.append(word);

    window.append(fillButt);

    window.append("<p>Слово по-немецки (во мн.ч.):</p>");
    window.append(wordS);

    window.append("<p>Артикль:</p>");
    derForm.append(articleDer);
    derForm.append("<label class='form-check-label' for='derRadio'>der</label>");
    window.append(derForm);
    dieForm.append(articleDie);
    dieForm.append("<label class='form-check-label' for='dieRadio'>die</label>");
    window.append(dieForm);
    dasForm.append(articleDas);
    dasForm.append("<label class='form-check-label' for='dasRadio'>das</label>")
    window.append(dasForm);

    window.append("<p>Перевод:</p>");
    window.append(translate);

    window.append("<p>Транскрипция:</p>");
    window.append(transcription);

    window.append("<p>Пример:</p>");
    window.append(example);

    window.append("<p>Перевод примера:</p>");
    window.append(exampleTranslate);

    window.append(saveButt);
    if (id !== "") {
        window.append(deleteButt);
    }

    $("body").append(window);
    if (isPhone) $("#changeWordWindow").css("width", "85%");

    if (wordId !== "" && listId !== "") {
        let wordJSON = user_info["wordsLists"][listId][wordId];
        let wordCount = wordJSON.word.split(" (");
        let exampleCount = wordJSON.example.split("(");
        word.val(wordCount[0]);
        if (wordCount[1] !== undefined) wordS.val(wordCount[1].split(")")[0]);
        $(`#${wordJSON.article}Radio`).attr("checked", "true");
        translate.val(wordJSON.translate);
        transcription.val(wordJSON.transcription);
        example.val(exampleCount[0]);
        if (wordCount[1] !== undefined) exampleTranslate.val(exampleCount[1].split(")")[0]);
    }
}
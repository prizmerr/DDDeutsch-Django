function saveVariant(id) {
    let wordCheck = wordsGroups[id].children[2];
    if (wordCheck.image() == checkImg) {
        wordCheck.image(checkedImg);
        variants.push(id);
    } else {
        wordCheck.image(checkImg);
        variants.splice(variants.indexOf(id), 1);
    }
}

function checkVariant() {
    let rightAnswers = [];
    if (mode == 1) {
        for (let i = 0; i < 6; i++) {
            if (activeWords[i].article == activeArticle) rightAnswers.push(i);
        }
        if (JSON.stringify(variants.sort()) === JSON.stringify(rightAnswers.sort())) {
            rightAnswer(showChooseWords());
        } else wrongAnswer();
    } else {
        mode = 1;
        showChooseWords();
    }
}

function wrongAnswer() {
    choosePause();

    if (wrongAnsGroup == undefined) {
        const text = new Konva.Text({
            x: stage.width() / 2,
            y: stage.height() / 3,
            text: "Есть ошибки!",
            fontSize: gameWordsFontSize,
            fontFamily: "Calibri",
            fill: "black",
            align: "center"
        });
        text.offsetX(text.width() / 2);
        text.offsetY(text.height() / 2);

        const contText = new Konva.Text({
            x: stage.width() / 2,
            y: stage.height() / 2,
            text: "Продолжить",
            fontSize: gameHeaderFontSize,
            fontFamily: "Calibri",
            fill: "black",
            align: "center"
        });
        contText.offsetX(contText.width() / 2);
        contText.offsetY(contText.height() / 2);

        const contRect = new Konva.Rect({
            x: stage.width() / 2,
            y: stage.height() / 2,
            height: contText.height() + 20,
            width: contText.width() + 20,
            fill: buttFill,
            stroke: "black"
        });
        contRect.offsetX(contRect.width() / 2);
        contRect.offsetY(contRect.height() / 2);
        contRect.cornerRadius(contRect.height() / 4);

        const ansText = new Konva.Text({
            x: stage.width() / 2,
            y: contRect.y() + contRect.height() + 15,
            text: "Узнать ответ",
            fontSize: gameHeaderFontSize,
            fontFamily: "Calibri",
            fill: "black",
            align: "center"
        });
        ansText.offsetX(ansText.width() / 2);
        ansText.offsetY(ansText.height() / 2);

        const ansRect = new Konva.Rect({
            x: stage.width() / 2,
            y: contRect.y() + contRect.height() + 15,
            height: contText.height() + 20,
            width: contText.width() + 20,
            fill: buttFill,
            stroke: "black"
        });
        ansRect.offsetX(ansRect.width() / 2);
        ansRect.offsetY(ansRect.height() / 2);
        ansRect.cornerRadius(ansRect.height() / 4);

        const contGroup = new Konva.Group();
        contGroup.add(contRect);
        contGroup.add(contText);

        const ansGroup = new Konva.Group();
        ansGroup.add(ansRect);
        ansGroup.add(ansText);

        rect = new Konva.Rect({
            x: stage.width() / 2,
            y: stage.height() / 2,
            height: ansRect.y() + ansRect.offsetY() - text.y() + text.offsetY() + 60,
            width: ansRect.width() + 80,
            fill: messageWindowsFill,
            stroke: "black"
        });
        rect.offsetX(rect.width() / 2);
        rect.offsetY(rect.height() / 2);
        rect.cornerRadius(rect.width() / 10);

        wrongAnsGroup = new Konva.Group();
        wrongAnsGroup.add(opacityRect);
        wrongAnsGroup.add(rect);
        wrongAnsGroup.add(text);
        wrongAnsGroup.add(contGroup);
        wrongAnsGroup.add(ansGroup);

        contGroup.on("mouseenter", () => {
            stage.container().style.cursor = "pointer";
        });
        contGroup.on("mouseleave", () => {
            stage.container().style.cursor = "default";
        });
        contGroup.on("click tap", () => {
            wrongAnsGroup.remove();
            chooseContinue(false, false);
        });

        ansGroup.on("mouseenter", () => {
            stage.container().style.cursor = "pointer";
        });
        ansGroup.on("mouseleave", () => {
            stage.container().style.cursor = "default";
        });
        ansGroup.on("click tap", () => {
            showRightAnswer();
            wrongAnsGroup.remove();
            chooseContinue(false, false);
        });
    }
    mainLayer.add(wrongAnsGroup);
}

function showRightAnswer() {
    let shouldBeDrawn = [];
    for (let i = 0; i < 6; i++) {
        if (activeWords[i].article != activeArticle) shouldBeDrawn.push(i);
    }
    shouldBeDrawn.forEach(el => {
        wordsGroups[el].children[0].fill("#e04141");
    });
    checkGroup.children[1].text("Продолжить");
    checkGroup.children[1].offsetX(checkGroup.children[1].width() / 2);
    checkGroup.children[0].width(checkGroup.children[1].width() + 20);
    checkGroup.children[0].offsetX(checkGroup.children[0].width() / 2);
    mode = 0;
}
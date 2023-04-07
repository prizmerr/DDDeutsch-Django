function drawCardsGame() {
    clearLayer();

    // общие переменные
    const indent = 15;

    if (window.innerHeight > window.innerWidth) {
        closeGameButt.height(20);
        closeGameButt.width(20);
        pauseGameButt.height(20);
        pauseGameButt.width(20);
    }
    closeGameButt.x(stage.width() - closeGameButt.width() - indent);
    pauseGameButt.x(stage.width() - pauseGameButt.width() - closeGameButt.width() - indent * 2);

    // время в игре
    timeInGame = new Konva.Text({
        x: indent,
        y: gameHeaderOffsetY,
        text: "00:00:00",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "black"
    });

    // режим игры
    const gameModeText = new Konva.Text({
        x: stage.width() / 2,
        y: gameHeaderOffsetY,
        text: mode == "test" ? "Режим: В зачёт" : "Режим: Тренировка",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "black"
    });
    gameModeText.offsetX(gameModeText.width() / 2);
    if (window.innerHeight > window.innerWidth) {
        gameModeText.y(gameHeaderOffsetY + closeGameButt.height() + closeGameButt.y());
    }

    // карточка
    cardRect = new Konva.Rect({
        x: stage.width() / 2,
        y: stage.height() / 2,
        width: stage.width() / 3,
        height: stage.height() * 0.7,
        fill: "#b9bbc9",
        stroke: "black"
    });
    if (window.innerHeight > window.innerWidth) {
        cardRect.width(stage.width() * 0.8);
        cardRect.y(cardRect.y() + 20);
    }
    cardRect.offsetX(cardRect.width() / 2);
    cardRect.offsetY(cardRect.height() / 2);
    cardRect.cornerRadius(cardRect.width() / 15);

    // текст карточки
    wordText = new Konva.Text({
        x: stage.width() / 2,
        y: stage.height() / 3,
        text: words[wordId].word,
        fontSize: gameWordsFontSize,
        fontFamily: 'Calibri',
        fill: "black",
        align: "center"
    });
    if (wordText.width() > cardRect.width() * 0.9) wordText.width(cardRect.width() * 0.9);
    wordText.offsetX(wordText.width() / 2);

    // текст номера слова
    wordIdText = new Konva.Text({
        x: stage.width() / 2,
        y: cardRect.y() - cardRect.offsetY() + gameHeaderOffsetY,
        text: "00/00",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "black"
    });
    wordIdText.offsetX(wordIdText.width() / 2);

    // картинка-переворот
    const turnImg = new Image();
    turnImg.src = turnSrc;
    const turnImgButt = new Konva.Image({
        image: turnImg,
        width: 20,
        height: 20,
        x: stage.width() / 2,
        y: cardRect.y() - cardRect.offsetY() + cardRect.height() - cardRect.height() / 3
    });
    turnImgButt.offsetX(turnImgButt.width() / 2);

    // кнопка-переворот
    const turnImgRect = new Konva.Rect({
        x: stage.width() / 2,
        y: cardRect.y() - cardRect.offsetY() + cardRect.height() - cardRect.height() / 3,
        width: turnImgButt.width() + 20,
        height: turnImgButt.height() + 20,
        fill: "#c7c7c7",
        stroke: "black"
    });
    turnImgRect.offsetX(turnImgRect.width() / 2);
    turnImgRect.offsetY(turnImgRect.height() / 2 - turnImgButt.height() / 2);
    turnImgRect.cornerRadius(turnImgRect.height() / 4);

    // текст правильного ответа
    rightAnsText = new Konva.Text({
        x: stage.width(),
        y: stage.height(),
        text: "Я вспомнил(-а)\nартикль",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "#5c5c5c",
        align: "center"
    });
    rightAnsText.offsetX(rightAnsText.width() + indent);
    rightAnsText.offsetY(rightAnsText.height() + indent);

    // градиент правильного ответа
    rightAnsRect = new Konva.Rect({
        x: stage.width() - stage.width() / 2.5,
        y: timeInGame.y() + timeInGame.height() + gameHeaderOffsetY,
        height: stage.height(),
        width: stage.width() / 2.5,
        opacity: 0
    });
    if (window.innerHeight > window.innerWidth) {
        rightAnsRect.height(rightAnsText.height() + 20);
        rightAnsRect.width(cardRect.width() / 2);
        rightAnsRect.cornerRadius([0, 0, cardRect.cornerRadius(), 0]);
        rightAnsRect.x(cardRect.x());
        rightAnsRect.y(cardRect.y() + cardRect.height() - cardRect.offsetY() - rightAnsRect.height());
        rightAnsRect.fill("#cfcfcf");
        rightAnsRect.stroke("black");
        rightAnsRect.opacity(1);

        rightAnsText.fontSize(rightAnsText.fontSize() - 6);
        rightAnsText.width(rightAnsRect.width());
        rightAnsText.x(rightAnsRect.x());
        rightAnsText.offsetX(0);
        rightAnsText.y(rightAnsRect.y() + rightAnsText.height() / 2);
        rightAnsText.offsetY(0);
        rightAnsText.fill("#424242");
    } else {
        rightAnsRect.fillLinearGradientStartPoint({
            x: rightAnsRect.width(),
            y: stage.height() / 2
        });
        rightAnsRect.fillLinearGradientEndPoint({
            x: 0,
            y: stage.height() / 2
        });
        rightAnsRect.fillLinearGradientColorStops([0, "#858585", 1, "white"]);
    }

    // текст неправильного ответа
    wrongAnsText = new Konva.Text({
        x: indent,
        y: stage.height(),
        text: "Я не вспомнил(-а)\nартикль",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "#5c5c5c",
        align: "center"
    });
    wrongAnsText.offsetY(wrongAnsText.height() + indent);

    // градиент неправильного ответа
    wrongAnsRect = new Konva.Rect({
        x: 0,
        y: timeInGame.y() + timeInGame.height() + gameHeaderOffsetY,
        height: stage.height(),
        width: stage.width() / 2.5,
        opacity: 0
    });
    if (window.innerHeight > window.innerWidth) {
        wrongAnsRect.height(rightAnsRect.height());
        wrongAnsRect.width(cardRect.width() / 2);
        wrongAnsRect.cornerRadius([0, 0, 0, cardRect.cornerRadius()]);
        wrongAnsRect.x(cardRect.x() - cardRect.offsetX() + wrongAnsRect.width());
        wrongAnsRect.offsetX(wrongAnsRect.width());
        wrongAnsRect.y(cardRect.y() + cardRect.height() - cardRect.offsetY() - wrongAnsRect.height());
        wrongAnsRect.fill("#cfcfcf");
        wrongAnsRect.stroke("black");
        wrongAnsRect.opacity(1);


        wrongAnsText.fontSize(wrongAnsText.fontSize() - 6);
        wrongAnsText.width(wrongAnsRect.width());
        wrongAnsText.x(wrongAnsRect.x());
        wrongAnsText.offsetX(wrongAnsText.width());
        wrongAnsText.y(rightAnsRect.y() + rightAnsText.height() / 2);
        wrongAnsText.offsetY(0);
        wrongAnsText.fill("#424242");
    } else {
        wrongAnsRect.fillLinearGradientStartPoint({
            x: 0,
            y: stage.height() / 2
        });
        wrongAnsRect.fillLinearGradientEndPoint({
            x: wrongAnsRect.width(),
            y: stage.height() / 2
        });
        wrongAnsRect.fillLinearGradientColorStops([0, "#858585", 1, "white"]);
    }

    // группа кнопки переворота
    turnGroup = new Konva.Group();
    turnGroup.add(turnImgRect);
    turnGroup.add(turnImgButt);
    if (window.innerHeight > window.innerWidth) {
        turnGroup.y(turnImgRect.y() - turnImgRect.y() * 1.1);
    }

    // группа карточки
    cardGroup = new Konva.Group();
    cardGroup.add(cardRect);
    cardGroup.add(wordIdText);
    cardGroup.add(wordText);
    cardGroup.add(turnGroup);
    cardGroup.offsetX(stage.width() / 2)
    cardGroup.offsetY(stage.width() / 2)
    cardGroup.x(stage.width() / 2)
    cardGroup.y(stage.width() / 2)

    mainLayer.add(closeGameButt);
    mainLayer.add(pauseGameButt);
    mainLayer.add(timeInGame);
    mainLayer.add(gameModeText);
    if (window.innerHeight > window.innerWidth) {
        cardGroup.add(rightAnsRect);
        cardGroup.add(rightAnsText);
        cardGroup.add(wrongAnsRect);
        cardGroup.add(wrongAnsText);
    } else {
        mainLayer.add(rightAnsRect);
        mainLayer.add(rightAnsText);
        mainLayer.add(wrongAnsRect);
        mainLayer.add(wrongAnsText);
    }
    mainLayer.add(cardGroup);
}
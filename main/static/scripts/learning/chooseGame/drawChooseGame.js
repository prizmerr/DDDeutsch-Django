function drawChooseGame() {
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

    // артикль
    articleText = new Konva.Text({
        x: stage.width() / 2,
        y: timeInGame.y() + timeInGame.height() + gameHeaderOffsetY * 3,
        text: window.innerHeight > window.innerWidth ? "Найдите слова\nс артиклем: die" : "Найдите слова с артиклем: die",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "black",
        align: "center"
    });
    articleText.offsetX(articleText.width() / 2);

    mainLayer.add(closeGameButt);
    mainLayer.add(pauseGameButt);
    mainLayer.add(timeInGame);
    mainLayer.add(articleText);

    // прямоугольники со словами
    checkImg.src = checkSrc;
    checkedImg.src = checkedSrc;
    for (let i = 0; i < 6; i++) {
        const text = new Konva.Text({
            x: 0,
            y: 0,
            text: "word",
            width: stage.width() / 7,
            height: stage.height() / 6,
            fontSize: gameHeaderFontSize,
            fontFamily: "Calibri",
            fill: "black",
            align: "center"
        });
        if (window.innerHeight > window.innerWidth) {
            text.width(stage.width() / 3);
            text.height(stage.height() / 10);
            text.fontSize(text.fontSize() - 1);
        }

        const rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: text.width() + 30,
            height: text.height() + 30,
            fill: wordFill,
            stroke: "black"
        });
        rect.cornerRadius(rect.height() / 6);
        text.offsetX(-rect.width() / 2 + text.width() / 2);
        text.offsetY(-text.height() / 2);

        const checkButt = new Konva.Image({
            image: checkImg,
            height: 25,
            width: 25
        });
        checkButt.x(rect.width() - checkButt.width() - 5);
        checkButt.y(rect.height() - checkButt.height() - 5);

        const group = new Konva.Group({
            id: i,
            width: rect.width(),
            height: rect.height()
        });
        group.add(rect);
        group.add(text);
        group.add(checkButt);

        wordsGroups.push(group);
        mainLayer.add(group);
    }

    if (window.innerHeight > window.innerWidth) {
        wordsGroups[0].x(stage.width() / 2 - wordsGroups[0].width() - indent / 2);
        wordsGroups[0].y(articleText.y() + articleText.height() + indent * 3);
        wordsGroups[1].x(stage.width() / 2 + indent / 2);
        wordsGroups[1].y(articleText.y() + articleText.height() + indent * 3);
        wordsGroups[2].x(stage.width() / 2 - wordsGroups[0].width() - indent / 2);
        wordsGroups[2].y(wordsGroups[0].y() + wordsGroups[0].height() + indent);
        wordsGroups[3].x(stage.width() / 2 + indent / 2);
        wordsGroups[3].y(wordsGroups[1].y() + wordsGroups[1].height() + indent);
        wordsGroups[4].x(stage.width() / 2 - wordsGroups[0].width() - indent / 2);
        wordsGroups[4].y(wordsGroups[2].y() + wordsGroups[2].height() + indent);
        wordsGroups[5].x(stage.width() / 2 + indent / 2);
        wordsGroups[5].y(wordsGroups[3].y() + wordsGroups[3].height() + indent);
    } else {
        wordsGroups[1].x(stage.width() / 2 - wordsGroups[1].width() / 2);
        wordsGroups[1].y(articleText.y() + articleText.height() + indent * 4);
        wordsGroups[0].x(wordsGroups[1].x() - wordsGroups[0].width() - indent * 4);
        wordsGroups[0].y(articleText.y() + articleText.height() + indent * 4);
        wordsGroups[2].x(wordsGroups[1].x() + wordsGroups[2].width() + indent * 4);
        wordsGroups[2].y(articleText.y() + articleText.height() + indent * 4);
        wordsGroups[4].x(stage.width() / 2 - wordsGroups[4].width() / 2);
        wordsGroups[4].y(wordsGroups[1].y() + wordsGroups[1].height() + indent * 2);
        wordsGroups[3].x(wordsGroups[4].x() - wordsGroups[3].width() - indent * 4);
        wordsGroups[3].y(wordsGroups[0].y() + wordsGroups[0].height() + indent * 2);
        wordsGroups[5].x(wordsGroups[4].x() + wordsGroups[5].width() + indent * 4);
        wordsGroups[5].y(wordsGroups[2].y() + wordsGroups[2].height() + indent * 2);
    }


    // текст для проверки
    const checkText = new Konva.Text({
        x: stage.width() / 2,
        y: stage.height(),
        text: "Проверить",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "black",
        align: "center"
    });
    checkText.offsetX(checkText.width() / 2);

    // кнопка проверки
    const checkRect = new Konva.Rect({
        x: stage.width() / 2,
        y: stage.height(),
        width: checkText.width() + 20,
        height: checkText.height() + 20,
        stroke: "black",
        fill: buttFill
    });
    checkRect.cornerRadius(checkRect.height() / 4);
    checkRect.offsetX(checkRect.width() / 2);
    checkRect.offsetY(checkRect.height() + gameHeaderOffsetY);
    checkText.offsetY(checkText.height() / 2 + checkRect.height() / 2 + gameHeaderOffsetY);

    // группа проверки
    checkGroup = new Konva.Group();
    checkGroup.add(checkRect);
    checkGroup.add(checkText);
    if (window.innerHeight > window.innerWidth) checkGroup.y(-indent);

    mainLayer.add(checkGroup);
}
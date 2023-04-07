function drawRatioGame() {
    clearLayer();

    // общие переменные
    const indent = 15;
    const rectOffsetX = 25;
    const articleFillColor = "#6df2d3";
    const textFillColor = "#a9eb67";
    const articleRectCornerRadius = 7;


    if (window.innerHeight > window.innerWidth) {
        closeGameButt.height(20);
        closeGameButt.width(20);
        pauseGameButt.height(20);
        pauseGameButt.width(20);
    }
    closeGameButt.x(stage.width() - closeGameButt.width() - indent);
    pauseGameButt.x(stage.width() - pauseGameButt.width() - closeGameButt.width() - indent * 2);


    // текст номера слова
    wordIdText = new Konva.Text({
        x: stage.width() / 2,
        y: gameHeaderOffsetY,
        text: "00/00",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "black"
    });
    wordIdText.offsetX(wordIdText.width() / 2);
    if (window.innerHeight > window.innerWidth) {
        wordIdText.x(indent);
        wordIdText.offsetX(0);
    }


    // текст для повтора слова
    rRepeatWordText = new Konva.Text({
        x: indent,
        y: gameHeaderOffsetY,
        text: "Повторов слова:",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "black"
    });
    if (window.innerHeight > window.innerWidth) {
        rRepeatWordText.x(stage.width() / 2);
        rRepeatWordText.offsetX(rRepeatWordText.width() / 2);
        rRepeatWordText.y(gameHeaderOffsetY + closeGameButt.y() + closeGameButt.height());
    }


    // время в игре
    timeInGame = new Konva.Text({
        x: pauseGameButt.x() - 50,
        y: gameHeaderOffsetY,
        text: "00:00:00",
        fontSize: gameHeaderFontSize,
        fontFamily: "Calibri",
        fill: "black"
    });
    timeInGame.offsetX(timeInGame.width());


    // слово
    wordText = new Konva.Text({
        x: stage.width() / 2,
        y: stage.height() / 2,
        text: "word",
        fontSize: gameWordsFontSize,
        fontFamily: 'Calibri',
        fill: "black",
        align: "center"
    });
    wordText.offsetX(wordText.width() / 2);
    wordText.offsetY(wordText.height() / 2);

    // прямоугольник для слова
    wordRect = new Konva.Rect({
        width: wordText.width() + 50,  // отступы по 25 со всех сторон
        height: wordText.height() + 50,
        fill: textFillColor,
        stroke: "black",
        x: stage.width() / 2,
        y: stage.height() / 2
    });
    wordRect.offsetX(wordRect.width() / 2);
    wordRect.offsetY(wordRect.height() / 2);
    wordRect.cornerRadius(wordRect.height() / 3);

    // группа для прямоугольника со словом
    wordGroup = new Konva.Group({
        draggable: true
    });
    wordGroup.add(wordRect);
    wordGroup.add(wordText);


    // слово для der
    const derText = new Konva.Text({
        x: rectOffsetX,
        y: stage.height() / 6,
        text: "der",
        fontSize: gameWordsFontSize,
        fontFamily: 'Calibri',
        fill: "black"
    });

    // прямоугольник для der
    const derRect = new Konva.Rect({
        width: derText.width() + 50,  // отступы по 25 со всех сторон
        height: derText.height() + 50,
        fill: articleFillColor,
        stroke: "black",
        x: rectOffsetX,
        y: stage.height() / 6
    });
    derRect.cornerRadius(derRect.height() / articleRectCornerRadius);
    derText.offsetX(-derRect.width() / 2 + derText.width() / 2)
    derText.offsetY(-derRect.height() / 2 + derText.height() / 2);

    // группа для der
    derGroup = new Konva.Group();
    derGroup.add(derRect);
    derGroup.add(derText);


    // слово для die
    const dieText = new Konva.Text({
        x: stage.width() - rectOffsetX,
        y: stage.height() / 6,
        text: "die",
        fontSize: gameWordsFontSize,
        fontFamily: 'Calibri',
        fill: "black"
    });

    // прямоугольник для die
    const dieRect = new Konva.Rect({
        width: dieText.width() + 50,  // отступы по 25 со всех сторон
        height: dieText.height() + 50,
        fill: articleFillColor,
        stroke: "black",
        x: stage.width() - rectOffsetX,
        y: stage.height() / 6
    });
    dieRect.x(dieRect.x() - dieRect.width());
    dieRect.cornerRadius(dieRect.height() / articleRectCornerRadius);
    dieText.offsetX(dieRect.width() / 2 + dieText.width() / 2)
    dieText.offsetY(-dieRect.height() / 2 + dieText.height() / 2);

    // группа для die
    dieGroup = new Konva.Group();
    dieGroup.add(dieRect);
    dieGroup.add(dieText);


    // слово для das
    dasText = new Konva.Text({
        x: stage.width() / 2,
        y: stage.height() - stage.height() / 5,
        text: "das",
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: "black"
    });

    // прямоугольник для das
    const dasRect = new Konva.Rect({
        width: dasText.width() + 50,  // отступы по 25 со всех сторон
        height: dasText.height() + 50,
        fill: articleFillColor,
        stroke: "black",
        x: stage.width() / 2,
        y: stage.height() - stage.height() / 5
    });
    dasRect.cornerRadius(dasRect.height() / articleRectCornerRadius);
    dasRect.offsetX(dasRect.width() / 2);
    dasText.offsetX(dasText.width() / 2)
    dasText.offsetY(-dasRect.height() / 2 + dasText.height() / 2);

    // группа для das
    dasGroup = new Konva.Group();
    dasGroup.add(dasRect);
    dasGroup.add(dasText);


    mainLayer.add(rRepeatWordText);
    mainLayer.add(wordIdText);
    mainLayer.add(timeInGame);
    mainLayer.add(closeGameButt);
    mainLayer.add(pauseGameButt);
    mainLayer.add(derGroup);
    mainLayer.add(dieGroup);
    mainLayer.add(dasGroup);
    mainLayer.add(wordGroup);
}
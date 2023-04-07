function drawChooseMode(func) {
    clearLayer();

    const chooseModeText = new Konva.Text({
        x: stage.width() / 2,
        y: stage.height() / 4,
        text: window.innerHeight > window.innerWidth ? "Выберите\nрежим\nигры:" : "Выберите режим игры:",
        fontSize: 35,
        fontFamily: "Calibri",
        fill: "black",
        align: "center"
    });
    chooseModeText.offsetX(chooseModeText.width() / 2);
    if (window.innerHeight > window.innerWidth) {
        chooseModeText.y(chooseModeText.y() - 20);
    }

    const testText = new Konva.Text({
        x: stage.width() / 5,
        y: stage.height() / 2,
        text: "В зачёт",
        fontSize: 25,
        fontFamily: "Calibri",
        fill: "black",
        width: stage.width() / 4,
        align: "center"
    });
    if (window.innerHeight > window.innerWidth) {
        testText.width(stage.width() / 2);
        testText.x(stage.width() / 2);
        testText.offsetX(testText.width() / 2);
    }
    const testRect = new Konva.Rect({
        x: testText.x(),
        y: stage.height() / 2,
        height: testText.height() + 20,
        width: testText.width() + 20,
        offsetX: 10,
        offsetY: 10,
        fill: chooseModeRectFillUnactive,
        stroke: "black"
    });
    if (window.innerHeight > window.innerWidth) {
        testRect.offsetX(testRect.width() / 2);
    }
    testRect.cornerRadius(testRect.height() / 4);
    testModeGroup = new Konva.Group();
    testModeGroup.add(testRect);
    testModeGroup.add(testText);

    const workoutText = new Konva.Text({
        x: stage.width() - stage.width() / 5,
        y: stage.height() / 2,
        text: "Тренировка",
        fontSize: 25,
        fontFamily: "Calibri",
        fill: "black",
        width: stage.width() / 4,
        align: "center"
    });
    workoutText.x(workoutText.x() - workoutText.width());
    if (window.innerHeight > window.innerWidth) {
        workoutText.width(stage.width() / 2);
        workoutText.x(stage.width() / 2);
        workoutText.offsetX(workoutText.width() / 2);
        workoutText.y(testRect.y() + testRect.height() + 20);
    }
    const workoutRect = new Konva.Rect({
        x: workoutText.x(),
        y: stage.height() / 2,
        height: workoutText.height() + 20,
        width: workoutText.width() + 20,
        offsetX: 10,
        offsetY: 10,
        fill: chooseModeRectFillUnactive,
        stroke: "black"
    });
    if (window.innerHeight > window.innerWidth) {
        workoutRect.offsetX(workoutRect.width() / 2);
        workoutRect.y(workoutText.y());
    }
    workoutRect.cornerRadius(workoutRect.height() / 4);
    workoutModeGroup = new Konva.Group();
    workoutModeGroup.add(workoutRect);
    workoutModeGroup.add(workoutText);


    mainLayer.add(chooseModeText);
    mainLayer.add(testModeGroup);
    mainLayer.add(workoutModeGroup);

    testModeGroup.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
        testModeGroup.children[0].fill(chooseModeRectFillOver);
    });
    testModeGroup.on("mouseleave", () => {
        stage.container().style.cursor = "default";
        testModeGroup.children[0].fill(chooseModeRectFillUnactive);
    });
    testModeGroup.on("mousedown", () => {
        testModeGroup.children[0].fill(chooseModeRectFillClick);
    });
    testModeGroup.on("mouseup", () => {
        testModeGroup.children[0].fill(chooseModeRectFillOver);
    });
    testModeGroup.on("click tap", () => func("test"));

    workoutModeGroup.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
        workoutModeGroup.children[0].fill(chooseModeRectFillOver);
    });
    workoutModeGroup.on("mouseleave", () => {
        stage.container().style.cursor = "default";
        workoutModeGroup.children[0].fill(chooseModeRectFillUnactive);
    });
    workoutModeGroup.on("mousedown", () => {
        workoutModeGroup.children[0].fill(chooseModeRectFillClick);
    });
    workoutModeGroup.on("mouseup", () => {
        workoutModeGroup.children[0].fill(chooseModeRectFillOver);
    });
    workoutModeGroup.on("click tap", () => func("workout"));
}
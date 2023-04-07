function drawEndWindow(fromStart = false) {
    const finalText = new Konva.Text({
        x: stage.width() / 2,
        y: stage.height() / 2,
        align: "center",
        fontSize: 30,
        fontFamily: "Calibri",
        fill: "black",
        width: stage.width() * 0.6
    });
    if (fromStart) {
        finalText.text("В данный момент слов для повторения нет!");
    } else finalText.text("Тренировка завершена!\nВы успешно потрудились, самое время отдохнуть!");
    finalText.offsetX(finalText.width() / 2);
    finalText.offsetY(finalText.height() / 1.5);

    const exitText = new Konva.Text({
        x: stage.width() / 2,
        y: finalText.height() / 2 + finalText.y(),
        text: "ВЫХОД",
        align: "center",
        fontSize: 20,
        fill: "black"
    });
    exitText.offsetX(exitText.width() / 2);
    exitText.offsetY(-exitText.height() / 2);

    const exitRect = new Konva.Rect({
        x: stage.width() / 2,
        y: finalText.height() / 2 + finalText.y(),
        height: exitText.height() + 10,
        width: exitText.width() + 10,
        fill: "red",
        stroke: "black"
    });
    exitRect.offsetX(exitRect.width() / 2);
    exitRect.cornerRadius(exitRect.height() / 5);

    const finalRect = new Konva.Rect({
        x: stage.width() / 2,
        y: stage.height() / 2,
        height: finalText.height() + exitRect.height() + 15 + 50,
        width: finalText.width() + 50,
        fill: messageWindowsFill,
        stroke: "black"
    });
    finalRect.offsetX(finalRect.width() / 2);
    finalRect.offsetY(finalRect.height() / 2);
    finalRect.cornerRadius(finalRect.height() * 0.1);

    exitGroup = new Konva.Group();
    exitGroup.add(exitRect);
    exitGroup.add(exitText);

    mainLayer.add(opacityRect);
    mainLayer.add(finalRect);
    mainLayer.add(finalText);
    mainLayer.add(exitGroup);
    closeGameButt.remove();

    exitGroup.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    exitGroup.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
}
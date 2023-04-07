function drawPauseWindow() {
    if (pauseGroup === undefined) {
        const pauseText = new Konva.Text({
            x: stage.width() / 2,
            y: stage.height() / 2,
            text: "Продолжить",
            fontSize: 30,
            fontFamily: "Calibri",
            fill: "black"
        });
        pauseText.offsetX(pauseText.width() / 2);
        pauseText.offsetY(pauseText.height() / 2)
        const pauseRect = new Konva.Rect({
            x: stage.width() / 2,
            y: stage.height() / 2,
            width: pauseText.width() + 50,
            height: pauseText.height() + 50,
            fill: "#00ff09",
            stroke: "black"
        });
        pauseRect.offsetX(pauseRect.width() / 2);
        pauseRect.cornerRadius(pauseRect.height() / 5);
        pauseRect.offsetY(pauseRect.height() / 2);

        pauseGroup = new Konva.Group();
        pauseGroup.add(new Konva.Rect({
            x: 0,
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fill: "black",
            opacity: 0.5
        }));
        pauseGroup.add(pauseRect);
        pauseGroup.add(pauseText);

        pauseGroup.on("mouseenter", () => {
            stage.container().style.cursor = "pointer";
        });
        pauseGroup.on("mouseleave", () => {
            stage.container().style.cursor = "default";
        });
    }

    mainLayer.add(pauseGroup);
}
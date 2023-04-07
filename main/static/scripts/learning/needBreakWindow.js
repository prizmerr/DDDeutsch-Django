function needBreak() {
    if (breakGroup === undefined) {
        const breakText = new Konva.Text({
            x: stage.width() / 2,
            y: stage.height() / 2,
            align: "center",
            fontSize: 30,
            fontFamily: "Calibri",
            fill: "black",
            width: stage.width() * 0.6,
            text: "Не забывайте делать перерывы в тренировках!"
        });
        breakText.offsetX(breakText.width() / 2);
        breakText.offsetY(breakText.height() / 1.5);

        const contText = new Konva.Text({
            x: stage.width() / 2,
            y: breakText.height() / 2 + breakText.y(),
            fontSize: 30,
            fontFamily: "Calibri",
            fill: "black",
            text: "Продолжить"
        });
        contText.offsetX(contText.width() / 2);

        const contRect = new Konva.Rect({
            x: stage.width() / 2,
            y: breakText.height() / 2 + breakText.y(),
            height: contText.height() + 10,
            width: contText.width() + 10,
            fill: "#00ff09",
            stroke: "black"
        });
        contRect.offsetX(contRect.width() / 2);
        contRect.cornerRadius(contRect.height() / 5);
        contText.offsetY(contText.height() / 2 - contRect.height() / 2);

        const breakRect = new Konva.Rect({
            x: stage.width() / 2,
            y: stage.height() / 2,
            height: breakText.height() + contRect.height() + 15 + 50,
            width: breakText.width() + 50,
            fill: messageWindowsFill,
            stroke: "black"
        });
        breakRect.offsetX(breakRect.width() / 2);
        breakRect.offsetY(breakRect.height() / 2);
        breakRect.cornerRadius(breakRect.height() * 0.1);

        const contGroup = new Konva.Group();
        contGroup.add(contRect);
        contGroup.add(contText);

        breakGroup = new Konva.Group();
        breakGroup.add(new Konva.Rect({
            x: 0,
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fill: "black",
            opacity: 0.5
        }));
        breakGroup.add(breakRect);
        breakGroup.add(breakText);
        breakGroup.add(contGroup);

        mainLayer.add(breakGroup);

        contGroup.on("click tap", () => {
            switch (gameId) {
                case 1:
                    ratioContinue(true);
                    break;
                case 2:
                    cardsContinue(true);
                    break;
                case 3:
                    chooseContinue(true);
                    break;
            }
        });
        contGroup.on("mouseenter", () => {
            stage.container().style.cursor = "pointer";
        });
        contGroup.on("mouseleave", () => {
            stage.container().style.cursor = "default";
        });
    } else {
        mainLayer.add(breakGroup);
    }
}
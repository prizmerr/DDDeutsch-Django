function rightAnswer(func) {
    if (messageGroup == undefined) {
        const text = new Konva.Text({
            x: stage.width() / 2,
            y: stage.height() / 2,
            text: "Ответ верный!",
            fontSize: 40,
            fontFamily: "Calibri",
            fill: "black",
            align: "center"
        });
        text.offsetX(text.width() / 2);
        text.offsetY(text.height() / 2);

        const rect = new Konva.Rect({
            x: stage.width() / 2,
            y: stage.height() / 2,
            width: text.width() + 40,
            height: text.height() + 40,
            fill: messageWindowsFill,
            stroke: "black"
        });
        rect.offsetX(rect.width() / 2);
        rect.offsetY(rect.height() / 2);
        rect.cornerRadius(rect.height() / 5);

        messageGroup = new Konva.Group({
            opacity: 0
        });
        messageGroup.mode = "on"
        messageGroup.add(new Konva.Rect({
            x: 0,
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fill: "black",
            opacity: 0.5
        }));
        messageGroup.add(rect);
        messageGroup.add(text);
    }
    mainLayer.add(messageGroup);

    let interval = setInterval(() => {
        if (messageGroup.mode == "on") messageGroup.opacity(messageGroup.opacity() + 0.05);
        else messageGroup.opacity(messageGroup.opacity() - 0.05);

        if (messageGroup.opacity() >= 1) {
            func;
            messageGroup.mode = "off";
        }
        if (messageGroup.mode == "off" && messageGroup.opacity() <= 0) {
            messageGroup.mode = "on";
            messageGroup.opacity(0);
            messageGroup.remove();
            clearInterval(interval);
        }
    }, 10);
}
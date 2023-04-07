function activateRatioActions() {
    // выход слова за рамки
    mainLayer.on("mousemove mouseup touchmove touchend", () => {
        if (wordGroup.x() < -stage.width() / 2)
            wordGroup.x(-stage.width() / 2 + wordRect.width() / 2);
        else if (wordGroup.x() > stage.width() / 2)
            wordGroup.x(stage.width() / 2 - wordRect.width() / 2);
        if (wordGroup.y() < -stage.height() / 2)
            wordGroup.y(-stage.height() / 2 + wordRect.height() / 2);
        else if (wordGroup.y() > stage.height() / 2)
            wordGroup.y(stage.height() / 2 - wordRect.height() / 2);
    });

    // движение слова
    wordGroup.on("dragend", (e) => {
        let target = e.target.getClientRect();
        let articles = [derGroup, dieGroup, dasGroup];
        articles.forEach(el => {
            if (checkCollision(el.getClientRect(), target)) {
                checkRatioAnswer(el.children[1].text())
            }
        });
    });

    // клик по артиклям
    derGroup.on("click tap", () => {
        checkRatioAnswer("der");
    });
    dieGroup.on("click tap", () => {
        checkRatioAnswer("die");
    });
    dasGroup.on("click tap", () => {
        checkRatioAnswer("das");
    });

    // закрыть игру
    closeGameButt.on("click tap", () => {
        saveAndExit(true, mode == "test" ? true : false);
    });

    // поставить на паузу
    pauseGameButt.on("click tap", () => {
        ratioPause(true);
    });

    // курсор
    wordGroup.on("mouseenter", () => {
        stage.container().style.cursor = "move";
    });
    wordGroup.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    derGroup.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    derGroup.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    dieGroup.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    dieGroup.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    dasGroup.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    dasGroup.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    closeGameButt.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    closeGameButt.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    pauseGameButt.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    pauseGameButt.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
}

function checkCollision(r1, r2) {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
}

function activateRatioExitButt(needSave) {
    exitGroup.on("click tap", () => {
        saveAndExit(false, needSave);
    });
}
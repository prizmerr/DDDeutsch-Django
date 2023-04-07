function activateChooseActions() {
    // кнопка паузы
    pauseGameButt.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    pauseGameButt.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    pauseGameButt.on("click tap", () => {
        choosePause(true);
    });

    // кнопка закрытия
    closeGameButt.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    closeGameButt.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    closeGameButt.on("click tap", () => {
        saveAndExit(true, false);
    });

    // блоки слов
    for (let i = 0; i < 6; i++) {
        let block = wordsGroups[i];
        block.on("mouseenter", () => {
            stage.container().style.cursor = "pointer";
        });
        block.on("mouseleave", () => {
            stage.container().style.cursor = "default";
        });
        block.on("click tap", () => {
            if (mode == 1) saveVariant(i);
        });
    }

    // кнопка проверки
    checkGroup.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    checkGroup.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    checkGroup.on("click tap", () => {
        checkVariant(true);
    });
}

function activateChooseExitButt() {
    exitGroup.on("click tap", () => {
        saveAndExit(false, false);
    })
}
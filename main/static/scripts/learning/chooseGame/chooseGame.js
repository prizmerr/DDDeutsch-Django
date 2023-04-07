function chooseGame() {
    getAllWords().then((res) => {
        if (res !== "err") {
            window.onbeforeunload = () => {
                return true;
            }
            drawChooseGame();
            words = createWordsList(JSON.parse(res), true);
            if (words.length === 0) return endChooseGame(true);  // !!!!!!!!!!!!
            showChooseWords();
            startTimer();
            activateChooseActions();
            mode = 1;
        } else {
            showMessage("На сервере произошла ошибка. Попробуйте позднее.");
        }
    });
}

function endChooseGame(fromStart = false) {
    choosePause();
    drawEndWindow(fromStart);
    activateChooseExitButt();
}

function choosePause(fromButt = false) {
    if (fromButt) {
        drawPauseWindow();
        pauseGroup.on("click tap", () => {
            pauseGroup.remove();
            chooseContinue();
        });
    }
    clearInterval(timer);
    paused = true;
}

function chooseContinue(cBreak = false) {
    startTimer();
    paused = false;
    if (cBreak) breakGroup.remove();
}
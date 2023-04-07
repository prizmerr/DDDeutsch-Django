function cardsPause(fromButt = false, opRect = true) {
    if (fromButt) {
        drawPauseWindow();
        pauseGroup.on("click tap", () => {
            pauseGroup.remove();
            cardsContinue(false, opRect);
        });
    }
    clearInterval(timer);
    paused = true;
}

function cardsContinue(cBreak = false, opRect = true) {
    startTimer();
    paused = false;
    if (cBreak) breakGroup.remove();
    if (opRect) opacityRect.remove();
}
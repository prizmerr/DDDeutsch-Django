function ratioPause(fromButt = false) {
    if (fromButt) {
        drawPauseWindow();
        pauseGroup.on("click tap", () => {
            pauseGroup.remove();
            ratioContinue(false, opRect);
        });
    }
    clearInterval(timer);
    wordGroup.draggable(false);
    paused = true;
}

function ratioContinue(rBreak = false, opRect = true) {
    startTimer();
    wordGroup.draggable(true);
    paused = false;
    if (rBreak) breakGroup.remove();
    if (opRect) opacityRect.remove();
}
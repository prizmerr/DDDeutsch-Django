let cardsWords;

function cardsGame() {
    getAllWords().then((res) => {
        if (!isDemo) {
            if (res !== "err") {
                cardsWords = res;
                drawChooseMode(startCards);
            } else {
                showMessage("На сервере произошла ошибка. Попробуйте позднее.");
            }
        } else {
            if (res !== "err") {
                cardsWords = res;
                startCards("workout")
            } else {
                showMessage("На сервере произошла ошибка. Попробуйте позднее.");
            }
        }
    });
}

function startCards(cardsMode) {
    stage.container().style.cursor = "default";
    window.onbeforeunload = () => {
        return true;
    }
    mode = cardsMode;

    words = createWordsList(JSON.parse(cardsWords), mode == "workout");
    if (words.length === 0) return endCardsGame(true);

    drawCardsGame();
    showCardWord();
    startTimer();
    activateCardsActions();
}

function cardsRightAnswer() {
    saveRightAnswer();
    showCardWord();
}

function cardsWrongAnswer() {
    saveWrongAnswer();
    words.push(words.splice(wordId, 1)[0]);
    showCardWord();
}

function endCardsGame(fromStart = false) {
    cardsPause();
    drawEndWindow(fromStart);
    if (fromStart) activateCardsExitButt(false);
    else activateCardsExitButt(mode == "test" ? true : false);
}
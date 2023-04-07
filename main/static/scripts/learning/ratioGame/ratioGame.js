let ratioWords;

function ratioGame() {
    getAllWords().then((res) => {
        if (res !== "err") {
            ratioWords = res;
            drawChooseMode(startRatio);
        } else {
            showMessage("На сервере произошла ошибка. Попробуйте позднее.");
        }
    });
}

function startRatio(ratioMode) {
    stage.container().style.cursor = "default";
    window.onbeforeunload = () => {
        return true;
    }
    mode = ratioMode;

    words = createWordsList(JSON.parse(ratioWords), mode == "workout");
    if (words.length === 0) return endCardsGame(true);

    drawRatioGame();
    showRatioWord();
    startTimer();
    activateRatioActions();
}

function showRatioWord() {
    if (wordId === words.length) return endRatioGame(false);

    let activeWord = words[wordId];
    // повтор слова
    rRepeatWordText.text(`Повторов слова: ${activeWord.repeats}`);

    // № слова
    let wordNumber = `${wordId + 1}`;
    if (wordNumber.length < 2) wordNumber = "0" + wordNumber;
    let allWords = `${words.length}`;
    if (allWords.length < 2) allWords = "0" + allWords;
    wordIdText.text(`${wordNumber}/${allWords}`);

    // слово
    wordText.text(activeWord.word.split(" (")[0]);
    if (wordText.width() > stage.width() / 2) wordText.width(stage.width() / 2);
    wordText.offsetX(wordText.width() / 2);
    wordText.offsetY(wordText.height() / 2);

    // прямоугольник для слова
    wordRect.width(wordText.width() + 50);
    wordRect.height(wordText.height() + 50);
    wordRect.offsetX(wordRect.width() / 2);
    wordRect.offsetY(wordRect.height() / 2);

    // группа для слова
    wordGroup.x(0);
    wordGroup.y(0);
}

function checkRatioAnswer(article) {
    if (wordId === words.length || paused) return;
    if (article === words[wordId]["article"]) {
        ratioRightAnswer();
    } else ratioWrongAnswer();
}

function ratioRightAnswer() {
    saveRightAnswer();
    rightAnswer(showRatioWord());
}

function ratioWrongAnswer() {
    words.push(words.splice(wordId, 1)[0]);
    showRatioWord();
}

function endRatioGame(fromStart = false) {
    ratioPause();
    drawEndWindow(fromStart);
    if (fromStart) activateRatioExitButt(false);
    else activateRatioExitButt(mode == "test" ? true : false);
}
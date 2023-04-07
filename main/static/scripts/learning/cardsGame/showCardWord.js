function showCardWord() {
    if (wordId === words.length) return endCardsGame(false);

    let activeWord = words[wordId];
    cardSide = 1;

    // № слова
    let wordNumber = `${wordId + 1}`;
    if (wordNumber.length < 2) wordNumber = "0" + wordNumber;
    let allWords = `${words.length}`;
    if (allWords.length < 2) allWords = "0" + allWords;
    wordIdText.text(`${wordNumber}/${allWords}`);

    // слово
    newText(activeWord.word);
}

function newText(text) {
    wordText.text(text);
    if (wordText.width() > cardRect.width() * 0.9) wordText.width(cardRect.width() * 0.9);
    wordText.offsetX(wordText.width() / 2);
}
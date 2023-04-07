function saveRightAnswer() {
    let date = new Date();
    words[wordId]["lastRepeat"] = date.getTime();
    let word = words[wordId];
    if (word["repeats"] === 0) {
        words[wordId]["nextRepeat"] = date.setDate(date.getDate() + 1);
        newWordsLearned++;
    } else {
        words[wordId]["nextRepeat"] = date.setDate(date.getDate() + word["repeats"] * 2);
    }
    words[wordId]["repeats"]++;
    newWordsList.push(words[wordId]);
    wordId++;
    wordsRepeated++;
}
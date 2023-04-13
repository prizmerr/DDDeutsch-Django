function saveRightAnswer() {
    let date = new Date();
    if (wrongWordsList.indexOf(words[wordId]) == -1) {
        words[wordId]["lastRepeat"] = date.getTime();
        if (words[wordId]["repeats"] === 0) {
            words[wordId]["nextRepeat"] = date.setDate(date.getDate() + 1);
            newWordsLearned++;
        } else {
            words[wordId]["nextRepeat"] = date.setDate(date.getDate() + words[wordId]["repeats"] * 2);
        }
        words[wordId]["repeats"]++;
        newWordsList.push(words[wordId]);
    }
    wordId++;
    wordsRepeated++;
}
function saveWrongAnswer() {
    let date = new Date();
    if (words[wordId]["repeats"] !== 0 && wrongWordsList.indexOf(words[wordId]) == -1) {
        words[wordId]["lastRepeat"] = date.getTime();
        if (words[wordId]["repeats"] - 1 == 0) {
            words[wordId]["nextRepeat"] = date.setDate(date.getDate() + 1);
        } else {
            words[wordId]["nextRepeat"] = date.setDate(date.getDate() + (words[wordId]["repeats"] - 1) * 2);
        }
        wrongWordsList.push(words[wordId]);
    }
}
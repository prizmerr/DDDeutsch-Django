function showChooseWords() {
    activeWords = words.sort(() => { return Math.random() - 0.5 }).slice(0, 6);
    activeArticle = ["der", "die", "das", "der", "die", "das"].sort(() => { return Math.random() - 0.5 })[0];
    variants = [];

    for (let i = 0; i < 6; i++) {
        let word = activeWords[i].word.split(" (")[0];
        wordsGroups[i].children[1].text(word);
        wordsGroups[i].children[0].fill(wordFill);
        wordsGroups[i].children[2].image(checkImg);
    }

    checkGroup.children[1].text("Проверить");
    checkGroup.children[1].offsetX(checkGroup.children[1].width() / 2);
    checkGroup.children[0].width(checkGroup.children[1].width() + 20);
    checkGroup.children[0].offsetX(checkGroup.children[0].width() / 2);

    if (window.innerHeight > window.innerWidth) articleText.text(`Найдите слова\nс артиклем: ${activeArticle}`);
    else articleText.text(`Найдите слова с артиклем: ${activeArticle}`);
}
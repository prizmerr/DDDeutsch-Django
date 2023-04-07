function turnCard() {
    const turnInterval = setInterval(() => {
        if (cardGroup.scaleX() > 0 && !cardTurned) cardGroup.scaleX(Number((cardGroup.scaleX() - 0.1).toFixed(1)));
        else {
            if (cardSide > 0) newText(words[wordId].article);
            else newText(words[wordId].word);
            cardGroup.scaleX(Number((cardGroup.scaleX() + 0.1).toFixed(1)));
            cardTurned = true;
        }
        if (cardGroup.scaleX() >= 1) {
            cardGroup.scaleX(1);
            cardTurned = false;
            cardSide *= -1;
            clearInterval(turnInterval);
        }
    }, 20);
}


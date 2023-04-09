function saveAndExit(needConfirm, needSave = true) {
    if (needConfirm) {
        if (!confirm("Вы уверены, что хотите выйти из игры?")) return;
    }
    if (needSave) {
        $.post(
            "/words/updateWords/",
            {
                csrfmiddlewaretoken: token,
                words: JSON.stringify(newWordsList),
                newWords: newWordsLearned,
                wordsRepeated: wordsRepeated
            },
            (data) => {
                if (data === "error") {
                    showMessage("На сервере произошла ошибка. Слова не удалось сохранить.");
                } else {
                    window.onbeforeunload = null;
                    document.location.reload();
                }
            }
        );
    } else {
        window.onbeforeunload = null;
        document.location.reload();
    }
}
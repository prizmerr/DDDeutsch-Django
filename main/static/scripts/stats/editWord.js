function saveWord(listId, wordId) {
    let newWord;
    if ($("#changeWordSInput").val() !== "") {
        newWord = `${$("#changeWordInput").val()} (${$("#changeWordSInput").val()})`;
    } else newWord = $("#changeWordInput").val();
    let newArticle = $("input[type='radio']:checked").val();
    let newTranslate = $("#changeTraslateInput").val();
    let newTranscription = $("#changeTranscriptionInput").val();
    let newExample;
    if ($("#changeExampleTInput").val() !== "") {
        newExample = `${$("#changeExampleInput").val()} (${$("#changeExampleTInput").val()})`;
    } else newExample = $("#changeExampleInput").val();
    
    if (newWord === "" || newArticle === "" || newTranslate === "") {
        showMessage(`Убедитесь, что поля "Слово по-немецки" и "Перевод" заполнены, а также выбран артикль.`);
        return;
    }

    let finalWord = {
        word: newWord,
        article: newArticle,
        translate: newTranslate,
        transcription: newTranscription,
        example: newExample
    };

    if (wordId !== "") {
        finalWord.word_id = wordId*1;
    } else {
        finalWord.word_id = "";
    }
    
    $.post(
        "/words/saveWord/",
        {
            csrfmiddlewaretoken: token,
            tableId: listId,
            word: JSON.stringify(finalWord)
        },
        (data) => {
            if (data === "error") {
                showMessage("На сервере произошла ошибка. Попробуйте позднее.");
                $("#changeWordWindow").remove();
            } else if (data === "success") {
                showMessage("Слово успешно сохранено.");
                document.location.reload();
            }
        }
    )
}


function deleteWord(listId, wordId) {
    let sure = confirm("Вы уверены, что хотите удалить слово?");

    if (sure) {
        $.post(
            "/words/deleteWord/",
            {
                csrfmiddlewaretoken: token,
                tableId: listId,
                wordId: wordId
            },
            (data) => {
                if (data === "error") {
                    showMessage("На сервере произошла ошибка. Попробуйте позднее.");
                    $("#changeWordWindow").remove();
                } else if (data === "success") {
                    showMessage("Слово успешно удалено.");
                    document.location.reload();
                }
            }
        );
    }
}
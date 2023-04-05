function fillFields() {
    $.ajax({
        url: `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20220811T212427Z.5c21562b03e5b064.0b703dba36305e839289bec4d6eda2e84bce07c3&lang=de-ru&text=${$("#changeWordInput").val()}`,
        cache: false,
        error: (jq, status, err) => {
            console.log(jq);
            console.log(status);
            console.log(err);
            showMessage("На сервере произошла ошибка. Автоперевод недоступен.");
        }
    }).done(data => {
        let word = data.def[0];
        if (word == undefined) {
            return showMessage("К сожалению, результатов для данного слова не нашлось.");
        }

        let wordS = $("#changeWordSInput");
        let derRadio = $("#derRadio");
        let dieRadio = $("#dieRadio");
        let dasRadio = $("#dasRadio");
        let translate = $("#changeTraslateInput");
        let transcription = $("#changeTranscriptionInput");
        let example = $("#changeExampleInput");
        let exampleTranslate = $("#changeExampleTInput");

        wordS.val(word.fl);

        switch (word.gen) {
            case "f":
                dieRadio.prop("checked", true);
                break;
            case "n":
                dasRadio.prop("checked", true);
                break;
            case "m":
                derRadio.prop("checked", true);
                break;
        }

        let trans = "";
        for (let i = 0; i < word.tr.length; i++) {
            if (i < 2)
                trans += `${word.tr[i].text}, `;
            else {
                trans += word.tr[i].text;
                break;
            }
        }
        translate.val(trans);

        transcription.val(`[${word.ts}]`);
        example.val(word.tr[0].ex[0].text);
        exampleTranslate.val(word.tr[0].ex[0].tr[0].text);
    });
}
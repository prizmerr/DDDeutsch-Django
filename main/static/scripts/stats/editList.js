function saveList() {
    const listName = $("#listNameInput").val();
    if (listName === "") {
        console.log("Введите название списка.");
        return;
    }

    $.post(
        "/words/createList/",
        { 
            csrfmiddlewaretoken: token,
            name: listName
        },
        (data) => {
            if (data === "error") {
                showMessage("На сервере произошла ошибка. Попробуйте позднее.");
                $("#newListWindow").remove();
            } else if (data === "success") {
                showMessage("Список успешно создан.");
                document.location.reload();
            } else if (data == "exists") {
                showMessage("Список с таким названием уже существует.");
            }
        }
    );
}

function deleteList(listId) {
    const pass = $("#passwordInput").val();
    if (pass === undefined || pass === "") {
        showMessage("Необходимо ввести пароль.");
        return;
    }

    $.post(
        "/words/deleteList/",
        {
            csrfmiddlewaretoken: token,
            listId: listId,
            pass: pass
        },
        (data) => {
            if (data === "wrongPass") {
                showMessage("Пароль введен неверно.");
            } else if (data === "error") {
                showMessage("На сервере произошла ошибка. Попробуйте позднее.");
                $("#passwordInput").remove();
            } else if (data === "success") {
                showMessage("Список успешно удален.");
                document.location.reload();
            }
        }
    );
}

function renameList(listId) {
    const name = $("#renameInput").val();
    if (name === undefined || name === "") {
        showMessage("Введите новое название списка.");
        return;
    }

    $.post(
        "/words/renameList/",
        {
            csrfmiddlewaretoken: token,
            listId: listId,
            name: name
        },
        (data) => {
            if (data === "error") {
                showMessage("На сервере произошла ошибка. Попробуйте позднее.");
                $("#passwordInput").remove();
            } else if (data === "success") {
                showMessage("Список успешно переименован.");
                document.location.reload();
            } else if (data == "exists") {
                showMessage("Список с таким названием уже существует.");
            }
        }
    );
}
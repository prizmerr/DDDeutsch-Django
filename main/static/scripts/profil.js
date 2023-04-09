const personLogin = $("#personLogin");
const personEmail = $("#personEmail");
const personBirth = $("#personBirth");
const changeEmail = $("#changeEmail");
const changePass = $("#changePass");
const exit = $("#exitButton");
const del = $("#deleteButton");

let email2;
let changeEmailCode;

$.get(
    "/accActions/updateRepeatsInWeek",
    (data) => {
        if (data == "error") {
            showMessage("Не удалось получить с сервера информацию о статистике повторов за неделю.");
            readyStats = false;
        } else if (data == "unlogged") {
            document.location["href"] = "/"
        }
    }
);

$.get(
    "/accActions/getUserInfo/",
    (data) => {
        let user = data.split(";")
        personLogin.text(user[0]);
        personEmail.text(user[1]);
    }
);

function showWindow(type) {
    if ($("#changeWindow").length !== 0) $("#changeWindow").remove();

    const changeWindow = $("<div>", {
        id: "changeWindow",
        class: "windows"
    });

    const closeButt = $("<button>", {
        type: "button",
        class: "btn-close",
        id: "closeButt",
        onclick: "closeWindow()"
    });

    changeWindow.append(closeButt);

    if (type === "email") {
        let form = $("<form>", {
            method: "post",
            id: "emailForm"
        });
        let button = $("<button>", {
            id: "submitNewEmail",
            class: "btn btn-primary mt-3",
            onclick: "submitEmail()",
            text: "Получить код подтверждения"
        });

        form.append("<input type='email' placeholder='Введите новый email' name='newEmail' class='form-control form-control-lg' id='inputNewEmail'>");
        changeWindow.append(form);
        changeWindow.append(button);
    } else if (type === "pass") {
        let form = $("<form>", {
            method: "post",
            id: "passForm"
        });
        let oldPass = $("<input>", {
            type: "password",
            name: "oldPass",
            class: "form-control form-control-lg",
            id: "oldPass",
            placeholder: "Введите старый пароль"
        });
        let newPass1 = $("<input>", {
            type: "password",
            name: "newPass1",
            class: "form-control form-control-lg my-2",
            id: "newPass1",
            placeholder: "Введите новый пароль"
        });
        let newPass2 = $("<input>", {
            type: "password",
            name: "newPass2",
            class: "form-control form-control-lg my-2",
            id: "newPass2",
            placeholder: "Повторите новый пароль"
        });
        let sendPass = $("<button>", {
            id: "sendPass",
            class: "btn btn-primary mt-3",
            text: "Изменить пароль",
            onclick: "changePassFunc()"
        });

        form.append(oldPass);
        form.append(newPass1);
        form.append(newPass2);
        form.append("<label for='showPassWin' class='me-2'>Показать пароль: </label>");
        form.append("<input type='checkBox' class='form-check-input' onclick='showPassWindow()' id='showPassWin'>");
        form.append("<br>");
        changeWindow.append(form);
        changeWindow.append(sendPass);
    } else if (type === "del") {
        let form = $("<form>", {
            method: "post",
            id: "confPassForm"
        });

        let pass = $("<input>", {
            type: "password",
            name: "confPass",
            class: "form-control form-control-lg",
            id: "confPass",
            placeholder: "Введите пароль"
        });

        let sendPass = $("<button>", {
            id: "sendPass",
            class: "btn btn-primary mt-3",
            text: "Удалить аккаунт",
            onclick: "delPass()"
        });

        form.append("<p>Для продолжения введите пароль.</p>")
        form.append(pass);
        form.append(sendPass);
        changeWindow.append(form);
    }

    $("body").append(changeWindow)
    if (isPhone) $("#changeWindow").css("width", "85%");
}

function closeWindow() {
    $("#changeWindow").remove();
}

function submitEmail() {
    let form = document.forms["emailForm"];
    let email = form["newEmail"].value.trim();

    if (/\S+@\S+\.\S+/.test(email) && email !== email1 && email != "") {
        email2 = email;
        let button = $("#submitNewEmail");
        let wwindow = $("#changeWindow");
        let timerP = $("<p id='timerP'></p>");

        if ($("#codeInp").length !== 0) {
            $("#codeInp").remove();
            $("#checkCode").remove();
        }

        let codeInp = $("<input>", {
            id: "codeInp",
            class: "form-control form-control-lg",
            name: "codeInp",
            type: "text",
            placeholder: "Введите код подтверждения"
        });
        let checkCode = $("<button>", {
            id: "checkCode",
            class: "btn btn-primary mt-3",
            name: "checkCode",
            text: "Отправить",
            onclick: "checkCodes()"
        })

        button.attr("disabled", "true");
        wwindow.append(timerP);
        wwindow.append(codeInp);
        wwindow.append(checkCode);

        let time = 60;

        let timer = setInterval(() => {
            if (time % 10 === 1 && time !== 11) {
                timerP.text(`Повторно отправить сообщение через ${time} секунду.`);
            } else if ([2, 3, 4].indexOf(time % 10) !== -1 && parseInt(time / 10) !== 1) {
                timerP.text(`Повторно отправить сообщение через ${time} секунды.`);
            } else timerP.text(`Повторно отправить сообщение через ${time} секунд.`);
            if (time === 0) {
                button.removeAttr("disabled");
                timerP.remove();
                clearInterval(timer);
            } else time--;
        }, 1000);


        $.post(
            "/email/sendCode/",
            { 
                csrfmiddlewaretoken: token,
                email: email
            },
            (data) => {
                if (data === "error") {
                    showMessage("На сервере произошла ошибка.");
                } else if (data === "emEx" || data == "adminEmail") {
                    showMessage("На данный email уже зарегистрирован аккаунт.");
                    button.removeAttr("disabled");
                    timerP.remove();
                    clearInterval(timer);
                    codeInp.remove();
                    checkCode.remove();
                } else {
                    changeEmailCode = data;
                }
            }
        );
    } else showMessage("Проверьте правильность введенной почты. Она должна отличаться от существующей.")
}

function checkCodes() {
    $.post(
        "/email/checkCodes/",
        {
            csrfmiddlewaretoken: token,
            code1: changeEmailCode,
            code2: $("#codeInp").val()
        },
        (data) => {
            if (data == "True") {
                $.post(
                    "/accActions/changeEmail/",
                    {
                        csrfmiddlewaretoken: token,
                        newEmail: email2
                    },
                    (data) => {
                        if (data == "success") {
                            document.location.reload()
                        }
                    }
                )
            } else if (data == "error") {
                showMessage("На сервере произошла ошибка. Попробуйте позднее.")
            } else {
                showMessage("Убедитесь, что вы верно ввели код.")
            }
        }
    );
}

function changePassFunc() {
    let form = document.forms["passForm"];
    let oldPass = form["oldPass"].value.trim();
    let newPass1 = form["newPass1"].value.trim();
    let newPass2 = form["newPass2"].value.trim();

    if (oldPass === "" || newPass1 === "" || newPass2 === "") {
        showMessage("Убедитесь, что все поля заполнены.");
        return;
    }

    if (newPass1 !== newPass2) {
        showMessage("Убедитесь, что поля нового пароля заполнены одинаково.");
        return;
    }

    if (!(/[0-9]/.test(newPass1) && /[a-zа-я]/.test(newPass1) && /[A-ZА-Я]/.test(newPass1) && newPass1.length > 8)) {
        showMessage("В пароле должны использоваться цифры, заглавные и строчные буквы. Пароль должен быть длиннее 8 символов");
        return;
    }

    $.post(
        "/accActions/changePass/",
        {
            csrfmiddlewaretoken: token,
            oldPass: oldPass,
            newPass: newPass1
        },
        (data) => {
            if (data=="wrongPass") {
                showMessage("Неверно введен старый пароль.");
            } else if (data=="success") {
                document.location.reload();
            } else if (data=="error") {
                showMessage("На сервере произошла ошибка. Попробуйте позднее.")
            }
        }
    );
}

function delPass() {
    $("#sendPass").attr("disabled", "true");
    let pass = $("#confPass").val();

    $.post(
        "/accActions/deleteAcc/",
        {
            oldPass: pass,
            csrfmiddlewaretoken: token,
        },
        (data) => {
            if (data == "wrongPass") {
                showMessage("Неверно указан пароль.");
            } else if (data == "error") {
                showMessage("На сервере произошла ошибка. Попробуйте позднее.")
            } else {
                document.location.href = data;
            }
        }
    );
}

function showPassWindow() {
    let checkbox = $("#showPassWin");
    let pass1 = $("#oldPass");
    let pass2 = $("#newPass1");
    let pass3 = $("#newPass2");
    if (checkbox.prop("checked")) {
        pass1.attr("type", "text");
        pass2.attr("type", "text");
        pass3.attr("type", "text");
    } else {
        pass1.attr("type", "password");
        pass2.attr("type", "password");
        pass3.attr("type", "password");
    }
}

function sendMessage() {
    let value = $("#writeTextField").val().trim();

    if (value === "") showMessage("Введите сообщение в поле выше.")
    else {
        $("#sendText").attr("disabled", true);
        $.post(
            "/email/sendMessage/",
            {
                csrfmiddlewaretoken: token,
                message: value
            },
            (data) => {
                if (data == "success") {
                    showMessage("Сообщение было успешно отправлено разработчикам!");
                    $("#writeTextField").val("")
                    $("#sendText").removeAttr("disabled");
                } else if (data == "error") {
                    showMessage("На сервере произошла ошибка. Попробуйте позднее.")
                } else {
                    showMessage("На сервере произошла ошибка. Вы можете попробовать позднее или написать на почту \"dddeutsch.help@gmail.com\"");
                    $("#sendText").removeAttr("disabled");
                }
            }
        );
    }
}


changeEmail.click(() => showWindow("email"));
changePass.click(() => showWindow("pass"));

exit.click(() => {
    let sure = confirm("Вы уверены, что хотите выйти?");
    if (sure) {
        $.get(
            "/accActions/logout/",
            (data) => {
                document.location.href = data;
            }
        );
    }
});

del.click(() => showWindow("del"));
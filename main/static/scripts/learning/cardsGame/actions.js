function activateCardsActions() {
    // кнопка переворота карточки
    turnGroup.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
        turnGroup.children[0].fill("#bdbdbd");
    });
    turnGroup.on("mouseleave", () => {
        stage.container().style.cursor = "default";
        turnGroup.children[0].fill("#c7c7c7");
    });
    turnGroup.on("click tap", () => {
        turnCard();
    });

    // кнопка паузы
    pauseGameButt.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    pauseGameButt.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    pauseGameButt.on("click tap", () => {
        cardsPause(true);
    });

    // кнопка закрытия
    closeGameButt.on("mouseenter", () => {
        stage.container().style.cursor = "pointer";
    });
    closeGameButt.on("mouseleave", () => {
        stage.container().style.cursor = "default";
    });
    closeGameButt.on("click tap", () => {
        saveAndExit(true, mode == "test" ? true : false);
    });

    // движение карточки
    stage.on("mousedown touchstart", () => {
        lastMouseX = stage.getPointerPosition().x;
    });
    stage.on("mousemove touchmove", () => {
        if (lastMouseX != undefined) {
            diff = stage.getPointerPosition().x - lastMouseX;
            diff = diff * maxAngle / (stage.width() / 2);
            if (cardGroup.rotation() + diff < 18 && cardGroup.rotation() + diff > -18) {
                cardGroup.rotate(diff);
                if (!isPhone) cardGroup.x(cardGroup.x() + diff * 2);
                else cardGroup.x(cardGroup.x() + stage.getPointerPosition().x - lastMouseX);
            }
            lastMouseX = stage.getPointerPosition().x;
            if (cardGroup.rotation() >= 2 && !rightAnimed) {
                hideWrong();
                showRight();
            } else if (cardGroup.rotation() <= -2 && !wrongAnimed) {
                hideRight();
                showWrong();
            } else if (cardGroup.rotation() > -2 && cardGroup.rotation() < 2) {
                if (rightAnimed) hideRight();
                if (wrongAnimed) hideWrong();
            }
        }
    });
    $(window).on("mouseup touchend", () => {
        lastMouseX = undefined;
        cardGroup.rotate(-cardGroup.rotation());
        cardGroup.x(stage.width() / 2);

        if (rightAnimed) cardsRightAnswer();
        if (wrongAnimed) cardsWrongAnswer();

        hideRight();
        hideWrong();
    });

    // кнопки ответа
    if (window.innerHeight > window.innerWidth) {
        cardGroup.children[4].on("click tap", () => cardsRightAnswer());
        cardGroup.children[5].on("click tap", () => cardsRightAnswer());
        cardGroup.children[6].on("click tap", () => cardsWrongAnswer());
        cardGroup.children[7].on("click tap", () => cardsWrongAnswer());
    } else {
        rightAnsText.on("mouseenter", () => {
            stage.container().style.cursor = "pointer";
        });
        rightAnsText.on("mouseleave", () => {
            stage.container().style.cursor = "default";
        });
        rightAnsText.on("click tap", () => {
            cardsRightAnswer();
        });
        wrongAnsText.on("mouseenter", () => {
            stage.container().style.cursor = "pointer";
        });
        wrongAnsText.on("mouseleave", () => {
            stage.container().style.cursor = "default";
        });
        wrongAnsText.on("click tap", () => {
            cardsWrongAnswer();
        });
        cardGroup.on("mouseenter", () => {
            stage.container().style.cursor = "move";
        });
        cardGroup.on("mouseleave", () => {
            stage.container().style.cursor = "default";
        });
    }
}

function activateCardsExitButt(needSave) {
    exitGroup.on("click tap", () => {
        saveAndExit(false, needSave);
    })
}

function showRight() {
    if (!isPhone) {
        if (rightAnimOff != undefined) clearInterval(rightAnimOff);
        rightAnimOn = setInterval(() => {
            rightAnsRect.opacity(rightAnsRect.opacity() + 0.1);
            if (rightAnsRect.opacity() >= 1) {
                rightAnsRect.opacity(1);
                clearInterval(rightAnimOn);
            }
        }, 10);
    } else {
        rightAnsRect.fill("#bdbdbd");
    }
    rightAnimed = true;
}
function hideRight() {
    if (!isPhone) {
        if (rightAnimOn != undefined) clearInterval(rightAnimOn);
        if (rightAnimOff != undefined) clearInterval(rightAnimOff);
        if (rightAnsRect.opacity() != 0) {
            rightAnimOff = setInterval(() => {
                rightAnsRect.opacity(rightAnsRect.opacity() - 0.1);
                if (rightAnsRect.opacity() <= 0) {
                    rightAnsRect.opacity(0);
                    clearInterval(rightAnimOff);
                }
            }, 10);
        }
    } else {
        rightAnsRect.fill("#cfcfcf");
    }

    rightAnimed = false;
}

function showWrong() {
    if (!isPhone) {
        if (wrongAnimOff != undefined) clearInterval(wrongAnimOff);
        wrongAnimOn = setInterval(() => {
            wrongAnsRect.opacity(wrongAnsRect.opacity() + 0.1);
            if (wrongAnsRect.opacity() >= 1) {
                wrongAnsRect.opacity(1);
                clearInterval(wrongAnimOn);
                wrongAnimOn = undefined;
            }
        }, 10);
    } else {
        wrongAnsRect.fill("#bdbdbd");
    }
    wrongAnimed = true;
}
function hideWrong() {
    if (!isPhone) {
        if (wrongAnimOn != undefined) clearInterval(wrongAnimOn);
        if (wrongAnimOff != undefined) clearInterval(wrongAnimOff);
        if (wrongAnsRect.opacity() != 0) {
            wrongAnimOff = setInterval(() => {
                wrongAnsRect.opacity(wrongAnsRect.opacity() - 0.1);
                if (wrongAnsRect.opacity() <= 0) {
                    wrongAnsRect.opacity(0);
                    clearInterval(wrongAnimOff);
                }
            }, 10);
        }
    } else {
        wrongAnsRect.fill("#cfcfcf");
    }
    wrongAnimed = false;
}
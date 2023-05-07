// canvas

const stage = new Konva.Stage({
    container: "convaDiv"
});
if (window.innerHeight > window.innerWidth) {
    stage.width(window.innerWidth * 0.9);
    stage.height(window.innerHeight * 0.7);
    $("#convaDiv").css("margin-bottom", "1em");
} else {
    stage.height(Math.floor(window.innerHeight * 0.75));
    stage.width(stage.height() * 1.33);
}

const mainLayer = new Konva.Layer();

stage.add(mainLayer);

function clearLayer() {
    mainLayer.removeChildren();
    mainLayer.add(backgroundFill);
}


// общие элементы canvas

const backgroundFill = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: "white"
});

const closeGameImg = new Image();
closeGameImg.src = closeSrc;
const closeGameButt = new Konva.Image({
    image: closeGameImg,
    width: 15,
    height: 15
});

const pauseGameImg = new Image();
pauseGameImg.src = pauseSrc;
const pauseGameButt = new Konva.Image({
    image: pauseGameImg,
    width: 15,
    height: 15
});

const opacityRect = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: "black",
    opacity: 0.5
});


// menu

const mainBox = $("#mainBox");
const convaDiv = $("#convaDiv");

function play(id) {
    mainBox.css("display", "none");
    convaDiv.css("display", "flex");
    gameId = id;

    switch (id) {
        case 1:
            ratioGame();
            break;
        case 2:
            cardsGame();
            break;
        case 3:
            chooseGame();
            break;
    }
}

async function getAllWords() {
    try {
        let res;
        if (isDemo) {
            res = await $.get("/words/getAllWords?demo");
        } else {
            res = await $.get("/words/getAllWords/");
        }
        if (res !== "err") return res;
        else throw new Error();
    } catch (err) {
        console.log(err);
        showMessage("На сервере произошла ошибка.");
        return "err";
    }
}

function createWordsList(words, allWords = false) {
    let dateNow = new Date();
    let finalWords = [];
    let newWords = 0;
    for (let i = 0; i < words.length; i++) {
        if (!allWords && words[i].nextRepeat * 1000 < dateNow) {
            if (words[i].nextRepeat === 0 && newWords < 5) {
                finalWords.push(words[i]); 
                newWords++;
            } else if(words[i].nextRepeat !== 0) finalWords.push(words[i]);
        } else if (allWords) finalWords.push(words[i]);
    }
    return finalWords.sort(() => { return Math.random() - 0.5 });
}

function startTimer() {
    timer = setInterval(() => {
        gameTime++;
        let hours = `${Math.floor(gameTime / 3600)}`;
        let minutes = `${Math.floor(gameTime / 60 % 60)}`;
        let seconds = `${gameTime % 60}`;
        if (hours.length < 2) hours = "0" + hours;
        if (minutes.length < 2) minutes = "0" + minutes;
        if (seconds.length < 2) seconds = "0" + seconds;
        timeInGame.text(`${hours}:${minutes}:${seconds}`);

        if (gameTime % 1800 === 0) {
            needBreak();
            switch (gameId) {
                case 1:
                    ratioPause();
                    break;
                case 2:
                    cardsPause();
                    break;
                case 3:
                    choosePause();
                    break;
            }
        }
    }, 1000);
}

function clearRepeats() {
    $.get(
        "/words/clearRepeats",
        (data) => { console.log(data) }
    );
}


// gameVariables

const gameHeaderOffsetY = 5;
const gameHeaderFontSize = 20;
const gameWordsFontSize = 30;

let gameId;
let words;
let gameTime = 0;
let newWordsList = [];
let wrongWordsList = [];
let messageWindowsFill = "#9effba";
let newWordsLearned = 0;
let wordsRepeated = 0;
let timer;
let wordId = 0;
let wordText;
let timeInGame;
let paused = false;
let pauseGroup;
let breakGroup;
let exitGroup;
let wrongAnsGroup;
let messageGroup;
let mode;

// ratio
let rRepeatWordText;
let wordIdText;
let wordRect;
let wordGroup;
let derGroup;
let dieGroup;
let dasGroup;

// cards
let testModeGroup;
let workoutModeGroup;
let chooseModeRectFillUnactive = "#b7e8bf";
let chooseModeRectFillOver = "#95e8a2";
let chooseModeRectFillClick = "#7ee08e";
let cardGroup;
let cardRect;
let turnGroup;
let cardSide = 1;
let cardTurned = false;
let rightAnsRect;
let rightAnimed;
let wrongAnsRect;
let wrongAnimed;
let rightAnimOn, rightAnimOff;
let wrongAnimOn, wrongAnimOff;
let maxAngle = 18;
let lastMouseX;

// choose
let activeArticle;
let articleText;
let wordsGroups = [];
let activeWords = [];
let variants = [];
let checkImg = new Image();
let checkedImg = new Image();
let checkGroup;
let wordFill = "#a9eb67";
let buttFill = "#26c223";

closeGameButt.y(gameHeaderOffsetY);
pauseGameButt.y(gameHeaderOffsetY);
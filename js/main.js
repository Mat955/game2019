'use strict';
var params = {
    paper: document.querySelector("#paper"),
    rock: document.querySelector("#rock"),
    scissors: document.querySelector("#scissors"),
    output: document.querySelector("#output"),
    random: Math.floor(Math.random() * 3) + 1,
    score: document.querySelector("#score"),
    humanScore: 0,
    computerScore: 0,
    game: document.querySelector("#new-game"),
    question: 10,
    roundNumber: document.querySelector("#r-number"),
    gameResult: document.querySelector("#g-result"),
    circleButton: document.querySelectorAll(".circle-btn"),
    progress: [],
    eachRound: 0,
    table: document.querySelector("table"),
};

//START GAME (registerAddEventListener)

initialize();

function initialize() {
    registListener();
    controllButtons(true);
}

function registListener() {
    var buttonList = document.querySelectorAll('.player-move');

    for (let i = 0; i < buttonList.length; i++) {
        const buttonName = buttonList[i].getAttribute('data-move');

        buttonList[i].addEventListener('click', function () {
            playerMove(buttonName);
        });
    }
}

function controllButtons(disable) {
    params.circleButton.forEach(function (currentElement) {
        if (disable) {
            currentElement.setAttribute('disabled', true);
            currentElement.classList.remove('circle')
        } else {
            currentElement.removeAttribute('disabled');
            currentElement.classList.add('circle')
        }
    });
}

//NEW GAME

params.game.addEventListener('click', function () {
    controllButtons(false);
    resetGame();
    params.question = window.prompt('How many round would you like to play?');
    if (isNaN(params.question) || params.question.length < 1) {
        params.roundNumber.innerHTML = 'Please, write a number';
    } else {
        params.winner = Math.floor(params.question * 50 / 100 + 1);
        params.roundNumber.innerHTML = 'Number of round: ' + params.question + '  -   you will be a winner if you win ' + params.winner + ' rounds';
    }
    hideModal();
});

//RESET GAME

function resetGame() {
    params.humanScore = 0;
    params.computerScore = 0;
    params.score.innerHTML = params.humanScore + ' - ' + params.computerScore;
    params.output.innerHTML = '';
    params.gameResult.innerHTML = '';
    params.eachRound = 0;
    for (var i = 0; i < params.circleButton.length; i++) {
        params.circleButton[i].classList.remove('circle');
    }
}

function computerMove() {
    var random = Math.floor(Math.random() * 3);
    var computerChoices = ['paper', 'rock', 'scissors'];
    return computerChoices[random];
};

//Who Won 

function whoWon({
    human,
    computer
}) {
    switch (human) {
        case "rock":
            switch (computer) {
                case "paper":
                    return "computer";
                case "scissors":
                    return "human";
                default:
                    return "draw"
            }
        case "paper":
            switch (computer) {
                case "scissors":
                    return "computer";
                case "rock":
                    return "human";
                default:
                    return "draw"
            }
        case "scissors":
            switch (computer) {
                case "rock":
                    return "computer";
                case "paper":
                    return "human";
                default:
                    return "draw"
            }
    }
}

//PROCESS OF GAME

function playerMove(name) {
    var computerM = computerMove();
    params.eachRound++;

    let thisRoundObj = {
        'round-nb': params.eachRound,
        'computer-move': computerM,
        'player-move': name,
    };
    let result = whoWon({
        human: name,
        computer: computerM
    })

    if (result === 'computer') {
        params.computerScore++;
        thisRoundObj.result = 'Computer Won';
    } else if (result === 'human') {
        params.humanScore++;
        thisRoundObj.result = 'You Won';
    } else {
        thisResultObj.result = 'Draw';
    }
    params.score.innerHTML = params.humanScore + ' - ' + params.computerScore;
    params.output.innerHTML = thisRoundObj.result + '. You played ' + name + ', computer played ' + computerM;
    params.progress.push(thisRoundObj);
    if (thisRoundObj.result !== 'Draw') {
        endRound();
    }
}

//END ROUND

function endRound() {
    if (params.humanScore == params.winner || params.computerScore == params.winner) {
        paramsWin();
        controllButtons(true);
        showModal();
        createModalTable();
    } else {
        return;
    }
}

function paramsWin() {
    if (params.humanScore == params.winner) {
        params.gameResult.innerHTML = '<span>GAME OVER  - you won</span>' + '<br>' + '<span>Play Again!</span>';
    } else if (params.computerScore == params.winner) {
        params.gameResult.innerHTML = '<span>GAME OVER - computer won</span>' + '<br>' + '<span>Play Again!</span>';
    }
}

//SHOW MODAL 

function showModal() {
    var allModals = document.querySelectorAll('.modal');
    for (var i = 0; i < allModals.length; i++) {
        allModals[i].classList.remove('show');
    }
    document.querySelector('#modal-one').classList.add('show');
}

//HIDE MODAL 

var hideModal = function (event) {
    if (event) {
        event.preventDefault();
    }
    document.querySelector('#modal-one').classList.remove('show');
};
var closeButtons = document.querySelectorAll('.close');
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}

// MODAL TABLE

function createModalTable() {
    for (var g = 0; g < params.eachRound; g++) {
        params.gameResult.innerHTML += ' round number: ' + params.progress[g]['round-nb'] + ',   ';
        params.gameResult.innerHTML += ' your move: ' + params.progress[g]['player-move'] + ',  ';
        params.gameResult.innerHTML += ' computer move: ' + params.progress[g]['computer-move'] + ', ';
        params.gameResult.innerHTML += ' result: ' + params.progress[g]['result'] + '<br>';
    }
}
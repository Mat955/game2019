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

function startGame() {
    var buttonList = document.querySelectorAll('.player-move');

    for (let i = 0; i < buttonList.length; i++) {
        const buttonName = buttonList[i].getAttribute('data-move');

        buttonList[i].addEventListener('click', function () {
            playerMove(buttonName);
        });
    }
}

//NEW GAME

params.game.addEventListener('click', function () {
    startGame();
    resetGame();
    params.question = window.prompt('How many round would you like to play?');
    if (isNaN(params.question) || params.question.length < 1) {
        params.roundNumber.innerHTML = 'Please, write a number';
    } else {
        params.winner = Math.floor(params.question * 50 / 100 + 1);
        params.roundNumber.innerHTML = 'Number of round: ' + params.question + '  -   you will be a winner if you win ' + params.winner + ' rounds';
    }
});

//RESET GAME

function resetGame() {
    params.humanScore = 0;
    params.computerScore = 0;
    params.score.innerHTML = params.humanScore + ' - ' + params.computerScore;
    params.gameResult.innerHTML = '';
    for (var i = 0; i < params.circleButton.length; i++) {
        params.circleButton[i].classList.remove('circle');
    }
}

function computerMove() {
    var random = Math.floor(Math.random() * 3);
    var computerChoices = ['paper', 'rock', 'scissors'];
    return computerChoices[random];
};

function playerMove(name) {
    var computerM = computerMove();
    if ((name === 'rock' && computerM === 'paper') ||
        (name === 'paper' && computerM === 'scissors') ||
        (name === 'scissors' && computerM === 'rock')) {
        params.computerScore++;
        // params.eachRound++;
        params.score.innerHTML = params.humanScore + ' - ' + params.computerScore;
        // var computerWon = 'computer won';
        // params.progress.push({
        //     'round-nb': params.eachRound,
        //     'computer-move': computerM,
        //     'player-move': name,
        //     'result': computerWon,
        // });
        params.output.innerHTML = 'COMPUTER WON. You played ' + name + ', computer played ' + computerM;
        endRound();
    } else if ((name === 'rock' && computerM === 'scissors') ||
        (name === 'scissors' && computerM === 'paper') ||
        (name === 'paper' && computerM === 'rock')) {
        params.humanScore++;
        // params.eachRound++;
        params.score.innerHTML = params.humanScore + ' - ' + params.computerScore;
        // var youWon = 'you won';
        // params.progress.push({
        //     'round-nb': params.eachRound,
        //     'computer-move': computerM,
        //     'player-move': name,
        //     'result': youWon,
        // });
        params.output.innerHTML = 'YOU WON. You played ' + name + ', computer played ' + computerM;
        endRound();
    } else {
        params.output.innerHTML = 'DRAW. You played ' + name + ', computer played ' + computerM;
        // var draw = 'draw';
        // params.progress.push({
        //     'round-nb': params.eachRound,
        //     'computer-move': computerM,
        //     'player-move': name,
        //     'result': draw,
        // });
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
    event.preventDefault();
    document.querySelector('#modal-one').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.close');

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}




// MODAL TABLE

// function createModalTable() {
//     for (var g = 0; g < params.eachRound; g++) {
//         params.gameResult.innerHTML += ' round number: ' + params.progress[g]['round-nb'] + ',   ';
//         params.gameResult.innerHTML += ' your move: ' + params.progress[g]['player-move'] + ',  ';
//         params.gameResult.innerHTML += ' computer move: ' + params.progress[g]['computer-move'] + ', ';
//         params.gameResult.innerHTML += ' result: ' + params.progress[g]['result'] + '<br>';
//     }
// }

function paramsWin() {
    if (params.humanScore == params.winner) {
        params.gameResult.innerHTML = '<span>GAME OVER  - you won</span>' + '<br>' + '<span>Close Window and Start Again</span>';
    } else if (params.computerScore == params.winner) {
        params.gameResult.innerHTML = '<span>GAME OVER - computer won</span>' + '<br>' + '<span>Close Window and Start Again</span>';
    }
}

//END ROUND

function endRound() {
    if (params.humanScore == params.winner) {
        paramsWin();
        for (var i = 0; i < params.circleButton.length; i++) {
            params.circleButton[i].classList.add('circle');
            showModal();
            params.eachRound = 0;
        }
    } else if (params.computerScore == params.winner) {
        paramsWin();
        for (var i = 0; i < params.circleButton.length; i++) {
            params.circleButton[i].classList.add('circle');
            showModal();
            params.eachRound = 0;
        }
    } else {
        return;
    }
}
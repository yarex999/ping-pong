// basic canvas parameters
let canvas = document.querySelector('#gameCanvas');
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', resize)

document.addEventListener('keydown', playerOneControl);
document.addEventListener('keyup', playerResetControl);

// DIVS
let startDiv = document.querySelector('#startDiv');
let pauseDiv = document.querySelector('#pauseDiv');
let gameOverDiv = document.querySelector('#gameOverDiv');

let gameOverText = document.querySelector('#gameOverText');

// BUTTONS
let startButton = document.querySelector('#startButton');
let continueButton = document.querySelector('#continueButton');
let restartButton = document.querySelector('#restartButton');
let newGameButton = document.querySelector('#newGameButton');

startButton.addEventListener('click', gamePlay);
continueButton.addEventListener('click', gamePlay);
restartButton.addEventListener('click', gameRestart);
newGameButton.addEventListener('click', gameRestart);


// STARTED CLASSLIST

startDiv.classList = 'active';
pauseDiv.classList = '';
gameOverDiv.classList = '';





// PARAMETERS OF THE PLAYERS
// general
let platformWidth = 10;
let platformHeight = canvas.height * .12;
// timer
let gameInterval
let fps = 100;
// winScore
let scoreToWin = 9;
// level
let level = 1;
// first player platform:
let platformOneX = platformWidth;
let platformOneY = canvas.height / 2 - platformHeight / 2;
let platformOnePaceY = 10;

let platformOneDirection = null;
let playerOneScore = 0;

// second player platform 
let platformTwoX = canvas.width - platformWidth * 2;
let platformTwoY = canvas.height / 2 - platformHeight / 2;
let platformTwoPaceY = 5;

let playerTwoScore = 0;

// BALL
let ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballPaceX = 5;
let ballPaceY = 0;







// PHASES OF THE GAME
// playing
function gamePlay() {
    startDiv.classList = '';
    pauseDiv.classList = '';
    gameOverDiv.classList = '';

    gameInterval = setInterval(() => {
        drawEverything();
        moveEverything();
    }, 1000 / fps);
}
// pause
function gamePause() {
    startDiv.classList = '';
    pauseDiv.classList = 'active';
    gameOverDiv.classList = '';

    clearInterval(gameInterval);
}
// restart
function gameRestart() {
    startDiv.classList = '';
    pauseDiv.classList = '';
    gameOverDiv.classList = '';

    playerOneScore = 0;
    playerTwoScore = 0;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    ballPaceX = 5;
    ballPaceY = 0;

    platformTwoPaceY = 5;

    platformOneY = canvas.height / 2 - platformHeight / 2;
    platformTwoY = canvas.height / 2 - platformHeight / 2;

    gamePlay();
}



function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballPaceX = -ballPaceX
    ballPaceY = 0;
}

function gameOver(player) {
    clearInterval(gameInterval);

    startDiv.classList = '';
    pauseDiv.classList = '';
    gameOverDiv.classList = 'active';

    if (player) {
        gameOverText.innerHTML = "You win!"
    } else if (!player) {
        gameOverText.innerHTML = "You lose!"
    }

}

function resize() {
    resetBall();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawEverything();
};


// controlling
function playerOneControl(e) {
    e.preventDefault();
    switch (e.keyCode) {
        case 32:
        case 13:
            gamePause();
            break;
        case 38:
            platformOneDirection = 'up';
            break;
        case 40:
            platformOneDirection = 'down';
            break;
    }
}

function playerResetControl() {
    platformOneDirection = null;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

// BASIC FUNCTIONS:
// moving
function moveEverything() {
    // moving on X
    ballX += ballPaceX;

    if (ballX > canvas.width - platformWidth * 2 - ballSize / 2) {
        if (ballY >= platformTwoY && ballY <= platformTwoY + platformHeight && ballX < canvas.width - platformWidth) {

            // rejection from the platformTwo;
            ballPaceX = -ballPaceX;

            // the angle of the rejection;
            if (ballY > platformTwoY && ballY <= platformTwoY + platformHeight * .2) {
                ballPaceY = getRandom(-25, -15) * (.25 * level);
            } else if (ballY > platformTwoY + platformHeight * .2 && ballY <= platformTwoY + platformHeight * .4) {
                ballPaceY = getRandom(-15, -10) * (.25 * level);
            } else if (ballY > platformTwoY + platformHeight * .4 && ballY <= platformTwoY + platformHeight * .6) {
                ballPaceY = getRandom(-5, 0);
            } else if (ballY > platformTwoY + platformHeight * .6 && ballY <= platformTwoY + platformHeight * .8) {
                ballPaceY = getRandom(-15, -10) * (.25 * level);
            } else if (ballY > platformTwoY + platformHeight * .8 && ballY <= platformTwoY + platformHeight) {
                ballPaceY = getRandom(-25, -15) * (.25 * level);
            }

        } else if (ballX > canvas.width + ballSize / 2) {
            resetBall();
            playerOneScore++
            if (playerOneScore === scoreToWin) {
                gameOver(true);
            }
            level++;
            fps *= (.25 * level);
            platformTwoPaceY *= (.25 * level);

        }

    } else if (ballX < platformWidth * 2 + ballSize / 2) {
        if (ballY >= platformOneY && ballY <= platformOneY + platformHeight && ballX > platformWidth + ballSize / 2) {

            // rejection from the platformTwo;
            ballPaceX = -ballPaceX;

            // the angle of the rejection;
            if (ballY > platformOneY && ballY <= platformOneY + platformHeight * .2) {
                ballPaceY = getRandom(-25, -15) * (.25 * level);
            } else if (ballY > platformOneY + platformHeight * .2 && ballY <= platformOneY + platformHeight * .4) {
                ballPaceY = getRandom(-15, -10) * (.25 * level);
            } else if (ballY > platformOneY + platformHeight * .4 && ballY <= platformOneY + platformHeight * .6) {
                ballPaceY = getRandom(-5, 0);
            } else if (ballY > platformOneY + platformHeight * .6 && ballY <= platformOneY + platformHeight * .8) {
                ballPaceY = getRandom(-15, -10) * (.25 * level);
            } else if (ballY > platformOneY + platformHeight * .8 && ballY <= platformOneY + platformHeight) {
                ballPaceY = getRandom(-25, -15) * (.25 * level);
            }

        } else if (ballX < -ballSize / 2) {
            resetBall();
            playerTwoScore++
            if (playerTwoScore === scoreToWin) {
                gameOver(false);
            }
        }
    }

    // moving on Y
    ballY += ballPaceY;
    if (ballY < ballSize / 2) {
        ballPaceY = -ballPaceY;
        ballY = ballSize / 2
    } else if (ballY > canvas.height - ballSize / 2) {
        ballPaceY = -ballPaceY;
        ballY = canvas.height - ballSize / 2
    }

    // moving platformOne
    if (platformOneDirection == 'up' && platformOneY > 0) {
        platformOneY -= platformOnePaceY;
    } else if (platformOneDirection == 'down' && platformOneY < canvas.height - platformHeight) {
        platformOneY += platformOnePaceY;
    }


    // moving platformTwo;
    if (ballY < platformTwoY) {
        platformTwoY -= platformTwoPaceY;
    } else if (ballY > platformTwoY + platformHeight) {
        platformTwoY += platformTwoPaceY;
    }

}


// drawing / updating drawings
function drawEverything() {



    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    // ball
    context.arc(ballX, ballY, ballSize, 0, getRadians(360));
    context.fillStyle = 'rgba(0,0,0)'
    context.fill();

    // platforms
    context.fillRect(platformOneX, platformOneY, platformWidth, platformHeight);
    context.fillStyle = 'rgba(0,0,0)';
    context.fill();

    context.fillRect(canvas.width - platformWidth * 2, platformTwoY, platformWidth, platformHeight);
    context.fillStyle = 'rgba(0,0,0)';
    context.fill();

    // score
    context.textAlign = "center"
    context.fillStyle = 'rgba(0,0,0,0.5)'
    context.font = '100px Arial'
    context.fillText(playerOneScore, canvas.width * .25, canvas.height / 2);

    context.textAlign = "center"
    context.fillStyle = 'rgba(0,0,0,0.5)'
    context.font = '100px Arial'
    context.fillText(playerTwoScore, canvas.width * .75, canvas.height / 2);

    // separator
    context.beginPath();
    context.strokeStyle = 'rgba(0,0,0,0.5)'
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
}

// converting into radians;
function getRadians(degrees) {
    return (Math.PI / 180) * degrees;
}


document.querySelector('#wrapper').addEventListener('touchstart', event => {
    let touchY = event.changedTouches['0'].pageY;
    let touchX = event.changedTouches['0'].pageX;
    if(touchY >= platformOneY && touchY <= platformOneY + platformHeight && touchX <= platformWidth + platformOneX){
       document.querySelector('#wrapper').addEventListener('touchmove', event => {
           platformOneY = event.changedTouches['0'].pageY
       })
    }
})
/* global imports & variables */
var logging = new Logging();

var game = document.getElementById("game");
var ball = document.getElementById("ball");
var ballBackground = document.getElementById("ball-background");
var clickableArea = document.getElementById("clickable-area");

var score = document.getElementById("score-number");
var highScore = document.getElementById("high-score-number");
var localStorageHighScore = localStorage.getItem("highScore");

var gameWidth;
var gameHeight;
var ballRadius = 75;
var position;

var xVelocity;
var yVelocity;
var gVelocity;

if (this.localStorageHighScore) {
  this.highScore.innerHTML = this.localStorageHighScore;
}

/* game setup */
this.setupGame();
function setupGame() {
  if (
    parseInt(this.score.innerHTML) > parseInt(this.highScore.innerHTML) ||
    !parseInt(this.highScore.innerHTML)
  ) {
    this.highScore.innerHTML = this.score.innerHTML;
    localStorage.setItem("highScore", parseInt(this.highScore.innerHTML));
  }
  this.gameWidth = this.game.getBoundingClientRect().width;
  this.gameHeight = this.game.getBoundingClientRect().height;
  this.position = {
    left: this.gameWidth / 2,
    top: this.gameHeight / 1.6,
  };

  this.ball.style.left = `${position.left - ballRadius}px`;
  this.ball.style.top = `${position.top - ballRadius}px`;
  this.ballBackground.style.animation = ``;

  this.score.innerHTML = 0;
  this.xVelocity = 0;
  this.yVelocity = 0;
  this.gVelocity = 0;

  this.logging.debug(`Game width: ${this.gameWidth}`);
  this.logging.debug(`Game height: ${this.gameHeight}`);
}

/* movement interval */
setInterval(() => {
  if (this.gVelocity < 18) this.gVelocity = this.gVelocity * 1.05;
  this.xVelocity = this.xVelocity * 0.95;
  this.yVelocity = this.yVelocity * 0.95;
  this.moveBall(this.xVelocity, this.yVelocity, this.gVelocity);
}, 13);

/* collision check interval */
setInterval(() => {
  this.checkForCollision();
}, 13);

/* event listeners */
window.addEventListener("resize", function () {
  this.setupGame();
});

["mousedown", "touchstart"].forEach((evt) =>
  clickableArea.addEventListener(
    evt,
    (event) => {
      logging.debug(`Mouse click: {x: ${event.layerX}, y: ${event.layerY}}`);
      var xDiff = event.layerX - this.position.left;
      var yDiff = event.layerY - this.position.top;

      if (this.isInsideCircle(event)) {
        this.gVelocity = 2.5;
        this.score.innerHTML = parseInt(this.score.innerHTML) + 1;
        console.log(xDiff);
        if (xDiff > 0) {
          //spin left
          this.ballBackground.style.animation = `spin-left ${
            25 / xDiff
          }s infinite linear`;
          this.xVelocity = -xDiff * 0.4 - 6;
        }
        if (xDiff < 0) {
          //spin right
          this.ballBackground.style.animation = `spin-right ${
            25 / -xDiff
          }s infinite linear`;
          this.xVelocity = -xDiff * 0.4 + 6;
        }
        if (yDiff > 0) {
          this.yVelocity = -yDiff * 0.2 - 20;
        }
        if (yDiff < 0) {
          this.yVelocity = -yDiff * 0.2 - 10;
        }
      }
    },
    false
  )
);

function moveBall(xVelocity, yVelocity, gVelocity) {
  this.position.left = this.position.left + xVelocity;
  this.position.top = this.position.top + yVelocity + gVelocity;

  this.ball.style.top = `${this.position.top - ballRadius}px`;
  this.ball.style.left = `${this.position.left - ballRadius}px`;
}

function checkForCollision() {
  /* walls */
  if (this.position.left < 0 + this.ballRadius) {
    this.position.left = 0 + this.ballRadius;
    this.xVelocity = -this.xVelocity;
  }
  if (this.position.left > this.gameWidth - this.ballRadius) {
    this.position.left = this.gameWidth - this.ballRadius;
    this.xVelocity = -this.xVelocity;
  }

  /* roof */
  if (this.position.top < 0 + this.ballRadius) {
    this.position.top = 0 + this.ballRadius;
    this.yVelocity = -this.yVelocity;
  }

  /* floor */
  if (this.position.top > this.gameHeight * 2) {
    this.setupGame();
  }
}

function isInsideCircle(event) {
  return (
    Math.sqrt(
      (event.layerX - position.left) * (event.layerX - position.left) +
        (event.layerY - position.top) * (event.layerY - position.top)
    ) < ballRadius
  );
}

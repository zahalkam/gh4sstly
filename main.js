/* global imports & variables */
var logging = new Logging();

var game = document.getElementById("game");
var ball = document.getElementById("ball");
var clickableArea = document.getElementById("clickable-area");

var gameWidth;
var gameHeight;
var position;
var ballRadius = 100;

var xVelocity;
var yVelocity;
var gravity;

/* game setup */
this.setupGame();
function setupGame() {
  this.gameWidth = this.game.getBoundingClientRect().width;
  this.gameHeight = this.game.getBoundingClientRect().height;
  this.position = {
    left: this.gameWidth / 2,
    top: this.gameHeight / 2,
  };

  xVelocity = 0;
  yVelocity = 0;
  gravity = 0;

  logging.debug(`Game width: ${this.gameWidth}`);
  logging.debug(`Game height: ${this.gameHeight}`);
}

/* event listeners */
window.addEventListener("resize", function () {
  this.setupGame();
});

clickableArea.addEventListener("click", (event) => {
  logging.debug(`Mouse click: {x: ${event.layerX}, y: ${event.layerY}}`);
  console.log(event);
  var xDiff = event.layerX - this.position.left;
  var yDiff = event.layerY - this.position.top;

  console.log(xDiff);
  console.log(yDiff);
  if (this.isInsideCircle(event)) {
    this.resetVelocity();

    if (xDiff > 0) {
      this.xVelocity = -xDiff * 0.2 - 2;
    }
    if (xDiff < 0) {
      this.xVelocity = -xDiff * 0.2 - 2;
    }
    if (yDiff > 0) {
      this.yVelocity = -yDiff * 0.2 - 2;
    }
    if (yDiff < 0) {
      this.yVelocity = -yDiff * 0.2 - 2;
    }
  }
});

this.ball.style.left = `${position.left - ballRadius}px`;
this.ball.style.top = `${position.top - ballRadius}px`;

// movement interval
setInterval(() => {
  this.moveBall(this.xVelocity, this.yVelocity);
}, 13);

// collision check interval
setInterval(() => {
  this.checkForCollision();
}, 13);

function moveBall(xVelocity, yVelocity) {
  this.position.left = this.position.left + xVelocity;
  this.position.top = this.position.top + yVelocity;

  this.ball.style.top = `${this.position.top - ballRadius}px`;
  this.ball.style.left = `${this.position.left - ballRadius}px`;
}

function checkForCollision() {
  if (this.position.left < 0 + ballRadius) {
    this.position.left = 0 + ballRadius;
    this.xVelocity = -this.xVelocity;
  }
  if (this.position.left > window.innerWidth - ballRadius) {
    this.position.left = window.innerWidth - ballRadius;
    this.xVelocity = -this.xVelocity;
  }
  if (this.position.top < 0 + ballRadius) {
    this.position.top = 0 + ballRadius;
    this.yVelocity = -this.yVelocity;
  }
  if (this.position.top > window.innerHeight - ballRadius) {
    this.position.top = window.innerHeight - ballRadius;
    this.yVelocity = -this.yVelocity;
  }
}

function resetVelocity() {
  this.xVelocity = 0;
  this.yVelocity = 0;
}

function isInsideCircle(event) {
  return (
    Math.sqrt(
      (event.layerX - position.left) * (event.layerX - position.left) +
        (event.layerY - position.top) * (event.layerY - position.top)
    ) < ballRadius
  );
}

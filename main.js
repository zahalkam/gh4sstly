/* global imports & variables */
var logging = new Logging();

var game = document.getElementById("game");
var ball = document.getElementById("ball");
var clickableArea = document.getElementById("clickable-area");
var gameWidth;
var gameHeight;
var position;
var ballRadius = 75;

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

  this.ball.style.left = `${position.left - ballRadius}px`;
  this.ball.style.top = `${position.top - ballRadius}px`;

  xVelocity = 0;
  yVelocity = 0;
  gravity = 0;
  logging.debug(`Game width: ${this.gameWidth}`);
  logging.debug(`Game height: ${this.gameHeight}`);
}

/* movement interval */
setInterval(() => {
  this.moveBall(this.xVelocity, this.yVelocity);
}, 13);

/* collision check interval */
setInterval(() => {
  this.checkForCollision();
}, 13);

/* event listeners */
window.addEventListener("resize", function () {
  this.setupGame();
});

clickableArea.addEventListener("click", (event) => {
  logging.debug(`Mouse click: {x: ${event.layerX}, y: ${event.layerY}}`);

  var xDiff = event.layerX - this.position.left;
  var yDiff = event.layerY - this.position.top;

  if (this.isInsideCircle(event)) {
    if (xDiff > 0) {
      this.xVelocity = -xDiff * 0.4;
    }
    if (xDiff < 0) {
      this.xVelocity = -xDiff * 0.4;
    }
    if (yDiff > 0) {
      this.yVelocity = -yDiff * 0.2 - 8;
    }
    if (yDiff < 0) {
      this.yVelocity = -yDiff * 0.2 - 8;
    }
  }
});

function moveBall(xVelocity, yVelocity) {
  this.position.left = this.position.left + xVelocity;
  this.position.top = this.position.top + yVelocity;

  /* gravity multiplier */
  if (this.gravity < 18) {
    this.gravity = gravity * 1.05;
    this.position.top = this.position.top + this.gravity;
  }

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
  if (this.position.top > this.gameHeight - this.ballRadius) {
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

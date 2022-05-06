var xVelocity = 0;
var yVelocity = 0;

var ballRadius = 100;

var position = {
  left: window.innerWidth / 2,
  top: window.innerHeight / 2,
};

var ball = document.getElementById("ball");

this.ball.style.left = `${position.left - ballRadius}px`;
this.ball.style.top = `${position.top - ballRadius}px`;

console.log(position);

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

document.addEventListener("click", (event) => {
  var xDiff = event.clientX - position.left;
  var yDiff = event.clientY - position.top;
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

function isInsideCircle(event) {
  return (
    Math.sqrt(
      (event.clientX - position.left) * (event.clientX - position.left) +
        (event.clientY - position.top) * (event.clientY - position.top)
    ) < ballRadius
  );
}

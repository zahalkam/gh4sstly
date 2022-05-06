function Logging() {
  this.debug = function (message) {
    console.log(`%c${message}`, "color:green");
  };
}

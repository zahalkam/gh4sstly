function onSkinChange() {
  var ballBackground = document.getElementById("ball-background");
  var skin = document.getElementById("skin-select").value;
  ballBackground.style.backgroundImage = `url("assets/${skin}")`;
}

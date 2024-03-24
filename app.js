var mole;
var gameInProgress = false;
function start() {
    if (gameInProgress) return;
    gameInProgress = true;
    var num = Math.floor(Math.random() * 35);
    var divId = "block-" + num;
    var div = document.getElementById(divId);
    mole = document.createElement("img");
    mole.setAttribute('class', 'mole');
    mole.src = "mole-img.png";
    div.appendChild(mole);
    mole.addEventListener('click', score);
    mole.addEventListener('click', moveMole);
    var beepSound = document.getElementById("beepSound");
    mole.addEventListener('click', function () {
        beepSound.play()
    });
    var banner = document.querySelector("#banner");
    banner.style.display = "none"
}
var currentScore;
function score() {
    if (!gameInProgress) return;
    var displayPoints = document.getElementById("point");
    displayPoints.value = parseInt(displayPoints.value) + 1;
    currentScore = displayPoints.value
    var highScore = localStorage.getItem("highScore");
    if (!highScore || currentScore > parseInt(highScore)) {
        localStorage.setItem("highScore", currentScore);
    }

}
var block;
var previousBlockId;
function moveMole() {
    if (!gameInProgress) return;
    var divId;
    var div;
    mole.setAttribute('class', 'mole');
    mole.src = "mole-img.png";

    do {
        var num = Math.floor(Math.random() * 35);
        divId = "block-" + num;
        div = document.getElementById(divId);

    }
    while (divId === previousBlockId);
    previousBlockId = divId;
    div.appendChild(mole);

}
function stopGame() {
    gameInProgress = false;
    var gameOverSound = document.getElementById("gameOverSound").play();
    var banner = document.querySelector("#banner");
    banner.style.display = "block"
    var displayScore = document.querySelector("#displayScore")
    displayScore.innerHTML = `Score: ${currentScore}`;
    var displayPoints = document.getElementById("point");
    displayPoints.value = 0
    var blocks = document.querySelectorAll('.block');
    blocks.forEach(function (block) {
        if (block.contains(mole)) {
            block.removeChild(mole);
        }
    });
    document.querySelector("#highScore").innerHTML = `High Score: ${localStorage.getItem("highScore")}`;


}

document.querySelector('.board').addEventListener('click', function (event) {
    if (!event.target.classList.contains('mole') && gameInProgress) {
        stopGame();
    }
});


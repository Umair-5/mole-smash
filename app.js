var mole;
var gameInProgress = false;
function start() {
    if (gameInProgress) return;
    gameInProgress = true;
    var num = Math.floor(Math.random() * 20);
    var divId = "block-" + num;
    var div = document.getElementById(divId);
    mole = document.createElement("img");
    mole.setAttribute('class', 'mole');
    mole.src = "images-removebg-preview.png";
    div.appendChild(mole);
    mole.addEventListener('click', score);
    mole.addEventListener('click', moveMole);
    var banner = document.querySelector("#banner");
    banner.style.display = "none"
}
var currentScore;
function score() {
    if (!gameInProgress) return;
    var displayPoints = document.getElementById("point");
    displayPoints.value = parseInt(displayPoints.value) + 1;
    currentScore = displayPoints.value
}
var block;
var previousBlockId;
function moveMole() {
    if (!gameInProgress) return;
    var divId;
    var div;
    mole.setAttribute('class', 'mole');
    mole.src = "images-removebg-preview.png";

    do {
        var num = Math.floor(Math.random() * 20);
        console.log(num)
        divId = "block-" + num;
        div = document.getElementById(divId);

    } 
    while (divId === previousBlockId);
    // while (!div);
    previousBlockId = divId;
    div.appendChild(mole);

}
function stopGame() {
    gameInProgress = false;
    var banner = document.querySelector("#banner");
    banner.style.display = "block"
    var displayScore = document.querySelector("#displayScore")
    displayScore.innerHTML = `Your Score is ${currentScore}`;
    var displayPoints = document.getElementById("point");
    displayPoints.value = 0
    var blocks = document.querySelectorAll('.block');
    blocks.forEach(function (block) {
        if (block.contains(mole)) {
            block.removeChild(mole);
        }
    });
}

document.querySelector('.board').addEventListener('click', function (event) {
    if (!event.target.classList.contains('mole') && gameInProgress) {
        stopGame();
    }
});
















































function getScore() {

    var text = `<h1>Scores</h1>`;
    for (var i = 0; i < localStorage.length; i++) {
        text += `<h3>` + localStorage[i] + `</h3>`;
    }
document.body.innerHTML = text +
        `<button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Try Again</button>`;
}

getScore();
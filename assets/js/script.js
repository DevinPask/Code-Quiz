const questionsArray = [{
    question: "Inside what HTML element do we put the Javascript?",
    choices: ["<js>", "<script>", ".javascript", "<scriptstyle>"],
    correctAnswer: "<script>"
},
{
    question: "How do you write a variable in Javascript?",
    choices: ["-v", "variable", "var", "vari"],
    correctAnswer: "var"
},
{
    question: "How do you comment out a single line?",
    choices: ["/*", "//", "(==", "quotes"],
    correctAnswer: "//"
},
{
    question: "Where does console.log show?",
    choices: ["Terminal", "Vs code", "Dev Tools", "GitBash"],
    correctAnswer: "Dev Tools"
},
{
    question: "Return values back to the function call by using the keyword:",
    choices: ["value", "main", "prompt", "return"],
    correctAnswer: "return"
}];

var body = document.body;

var nav = document.createElement('nav');
body.appendChild(nav);

var highScoresEl = document.createElement('div');
highScoresEl.className = "highscores";
var a = document.createElement('a');
var hScorelink = document.createTextNode("Highscores")
highScoresEl.textContent = 'Highscores';
a.setAttribute('style', 'text-align: left');
a.appendChild(hScorelink);
a.title = 'Highcores';
a.href = "./hscores.html";
nav.appendChild(a);

hScorelink.addEventListener('click', function (event) {
    event.preventDefault();
});

var timerEl = document.createElement('div');
timerEl.className = "timer";
timerEl.textContent = 'Time Left: 30 seconds';
nav.appendChild(timerEl);


// 
var h1El = document.createElement('h1');
h1El.textContent = "Beginners Javascript Quiz"
body.appendChild(h1El);

var h3El = document.createElement('h3');
h3El.textContent = "Start Quiz";
body.appendChild(h3El);

var startButton = document.createElement('button');
startButton.textContent = "Start";
body.appendChild(startButton);

var quizQuestionSection = document.createElement('div');
var quizQuestionText = document.createElement('h2');


//new start function call start timer
var countdown;
var currentQuestion = -1;
var score = 0;
var timeLeft = 30;
var correct = "";
startButton.onclick = startGame;

function startGame() {

    // Timer
    countdown = setInterval(function () {

        if (timeLeft > 1) {
            timerEl.textContent = `Time left: ${timeLeft} seconds`;
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = `Time left: ${timeLeft} second`;
            timeLeft--;
        } else {
            timerEl.textContent = '';
            endGame();
        }

    }, 1000);
    startButton = body.removeChild(startButton);
    h1El = body.removeChild(h1El);
    h3El = body.removeChild(h3El);
    nextQuestion();
};

// Stop
function endGame() {
    clearInterval(countdown);

    console.log('end game');
    quizQuestionSection.innerHTML =
        `
    <h2>Game Over</h2>
    <h3>Score: ${score}</h3>
    <input type = "text" id="name" placeholder = "Your Name"></input>
    <button onclick="setScore()">Submit Score</button>
    `;

}

// Store Scores
function setScore() {
    var len = localStorage.length;

    var currentScore = {
        name: document.getElementById('name').value,
        value: score
    };

    localStorage.setItem(len, currentScore.name + ": " + currentScore.value);

    getScore();
}

function getScore() {

    var text = `<h1>Scores</h1>`;
    for (var i = 0; i < localStorage.length; i++) {
        text += `<h3>` + localStorage[i] + `</h3>`;
    }
    quizQuestionSection.innerHTML = text +
        `<button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Try Again</button>`;
}

//clear the score name 
function clearScore() {
    localStorage.clear();

    resetGame();
}
//reload game
function resetGame() {
    location.reload();
}

//loop through questions
function nextQuestion() {
    quizQuestionSection.innerHTML = ''
    currentQuestion += 1;

    if (currentQuestion > questionsArray.length - 1) {
        endGame();
        return;
    }


    displayQuestion();
}

// current question
function displayQuestion() {

    quizQuestionSection.className = 'quizSection';
    body.appendChild(quizQuestionSection)

    quizQuestionSection.appendChild(quizQuestionText);
    quizQuestionText.textContent = questionsArray[currentQuestion].question;

    displayChoices(questionsArray[currentQuestion].choices);
}


// choices
function displayChoices(choices) {
    var choicesEl = document.createElement('div');
    choicesEl.addEventListener('click', function (e) {
        if (e.target.matches('button')) {
            if (e.target.value !== questionsArray[currentQuestion].correctAnswer) {
                timeLeft -= 5;
            } else {
                score += 1;

                console.log(score);
            }
            nextQuestion();
        }
    })

    quizQuestionSection.appendChild(choicesEl);

    // Loop Through Question Choices
    for (var i = 0; i < choices.length; i++) {
        var choice = setAnswers(i);
        choicesEl.appendChild(choice);
    }
}


function setAnswers(index) {
    var choice = document.createElement('button');
    choice.textContent = questionsArray[currentQuestion].choices[index];
    choice.setAttribute('value', questionsArray[currentQuestion].choices[index]);
    // choice.id = 'choice' + (index + 1);
    choice.id = `choice${index + 1}`; // ES6 formatted string
    return choice;
}


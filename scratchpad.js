var questionsArray = [{
    question: "Which method removes the first element from an array and returns that removed element? This method changes the length of the array.",
    choices: ["shift( )", "unshift( )", "push( )", "filter( )"],
    answer: "shift( )"
  },
  {
    question: "Which method removes the last element from an array and returns that element? This method changes the length of the array.",
    choices: ["join( )", "slice( )", "splice( )", "pop( )"],
    answer: "pop( )"
  },
  {
    question: "Which method returns a string representing the specified array and its elements?",
    choices: ["concat( )", "fill( )", "toString( )", "flat( )"],
    answer: "toString( )"
  },
  {
    question: "Which method returns true or false if every element in the specified array satisfies a condition specified in the callback function. Returns false even if single element does not satisfy the condition?",
    choices: ["forEach( )", "reduce( )", "map( )", "every( )"],
    answer: "every( )"
  },
  {
    question: "Which method passes two elements simultaneously in the callback function (till it reaches the last element) and returns a single value?",
    choices: ["reduce( )", "some( )", "indexOf( )", "filter( )"],
    answer: "reduce( )"
  },
  {
    question: "Which method returns a new array with specified start to end elements?",
    choices: ["slice( )", "reverse( )", "some( )", "map( )"],
    answer: "slice( )"
  },
  {
    question: "Which method adds one or more elements to the front of an array and returns the new length of the array.",
    choices: ["splice( )", "unshift( )", "push( )", "pop( )"],
    answer: "unshift( )"
  },
  {
    question: "Which method creates a new array with the results of calling a provided function on every element in this array.",
    choices: ["forEach( )", "every( )", "reduce( )", "map( )"],
    answer: "map( )"
  },
  {
    question: "Which method adds and/or removes elements from an array.",
    choices: ["filter( )", "splice( )", "pop( )", "shift( )"],
    answer: "splice( )"
  },
  {
    question: "Which method adds one or more elements at the end of an array and returns the new length of the array.",
    choices: ["shift( )", "pop( )", "push( )", "shift( )"],
    answer: "push( )"
  }];
  
  // functions needed to:
  // start the game/timer
  // loop through questions
  // subtract time when there's an incorrect answer
  // end the game when time runs out
  // what if all questions answered before time runs out?
  // restart the game
  // add the score?
  // view the scores?
  
  var body = document.body;
  
  var nav = document.createElement('nav');
  body.appendChild(nav);
  
  var scoresEl = document.createElement('div');
  scoresEl.className = "scores";
  var a = document.createElement('a');
  var scoresLink = document.createTextNode("Scores");
  a.setAttribute('style', 'text-align: left');
  a.appendChild(scoresLink);
  a.title = 'Scores';
  a.href = "./scores.html";
  nav.appendChild(a);
  
  scoresLink.addEventListener('click', function(event) {
    event.preventDefault();
  });
  
  var timerEl = document.createElement('div');
  timerEl.className = "timer";
  timerEl.textContent = 'Time Left: 75 seconds';
  nav.appendChild(timerEl);
  
  var h1El = document.createElement('h1');
  h1El.textContent = "JavaScript Fundamentals Quiz!"
  body.appendChild(h1El);
  
  var h3El = document.createElement('h3');
  h3El.textContent = "Click Start to Play!";
  body.appendChild(h3El);
  
  var startButton = document.createElement('button');
  startButton.textContent = "Start!";
  body.appendChild(startButton);
  
  var quizQuestionSection = document.createElement('div');
  var quizQuestionText = document.createElement('h2');
  
  var choice1 = document.createElement('button');
  var choice2 = document.createElement('button');
  var choice3 = document.createElement('button');
  var choice4 = document.createElement('button');
  
  
  //function variables
  var countdown;
  var currentQuestion = -1;
  var score = 0;
  var timeLeft = 75;
  
  
  startButton.onclick = startGame;
  
  // Timer that counts down from timeLeft
  function startGame() {
    //console.log("start game")
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
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
  
  
  //stops the timer and game ends
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
  
  
  
  //store the scores on local storage
  function setScore() {
    localStorage.setItem("score", score);
    localStorage.setItem("scoreName",  document.getElementById('name').value);
    getScore();
  }
  
  
  function getScore() {
    quizQuestionSection.innerHTML = `
    <h2>` + localStorage.getItem("scoreName") + `'s score is:</h2>
    <h1>` + localStorage.getItem("score") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="startGame()">Play Again!</button>
    
    `;
  }
  
  //clears the score name and value in the local storage if the user selects 'clear score'
  function clearScore() {
    localStorage.clear();
  
    resetGame();
  }
  
  function resetGame() {
    location.reload();
  }
  
  //loop through questions
  function nextQuestion() {
    quizQuestionSection.innerHTML = ''
    //console.log("next question")
  
    // console.log('current Q', currentQuestion);
    // console.log('score', score);
    currentQuestion += 1;
  
    if (currentQuestion > questionsArray.length - 1) {
      endGame();
      return;
    }
  
  
    displayQuestion();
  }
  
  //displays the current question
  function displayQuestion() {
    //console.log("display question")
  
    quizQuestionSection.className = 'quizSection';
    body.appendChild(quizQuestionSection)
  
    quizQuestionSection.appendChild(quizQuestionText);
    quizQuestionText.textContent = questionsArray[currentQuestion].question;
  
    displayChoices();
  }
  
  
  //displays the current question's choices
  function displayChoices() {
    //console.log("display choice")
    var choicesEl = document.createElement('div');
    choicesEl.addEventListener('click', function (e) {
      if (e.target.matches('button')) {
        if (e.target.value !== questionsArray[currentQuestion].answer) {
          timeLeft -= 10;
        } else {
          score += 20;
          console.log(score);
        }
        nextQuestion();
      }
    })
    
    quizQuestionSection.appendChild(choicesEl);
  
    //creates the buttons for choices
    //choice1
    choice1.textContent = questionsArray[currentQuestion].choices[0];
    choice1.setAttribute('value', questionsArray[currentQuestion].choices[0]);
    choice1.id = 'choice1';
    choicesEl.appendChild(choice1);
  
    //choice2
    choice2.textContent = questionsArray[currentQuestion].choices[1];
    choice2.setAttribute('value', questionsArray[currentQuestion].choices[1]);
    choice2.id = 'choice2';
    choicesEl.appendChild(choice2);
  
    //choice3
    choice3.textContent = questionsArray[currentQuestion].choices[2];
    choice3.setAttribute('value', questionsArray[currentQuestion].choices[2]);
    choice3.id = 'choice3';
    choicesEl.appendChild(choice3);
  
    //choice4
    choice4.textContent = questionsArray[currentQuestion].choices[3];
    choice4.setAttribute('value', questionsArray[currentQuestion].choices[3]);
    choice4.id = 'choice4';
    choicesEl.appendChild(choice4);
  
  }
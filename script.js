// QUESTIONS AND ANSWERS ARRAY
var QandA = [
    {
        question: "What year was George R.R. Martin's book 'A Game of Thrones' published?",
        answers: ["1989", "2003", "1996", "2005"],
        rightAnswer: 2
    }, {
        question: "What was the name of Jon Snow's direwolf?",
        answers: ["Lady", "Ghost", "Grey Wind", "Wolf"],
        rightAnswer: 1
    }, {
        question: "At whose castle did the 'Red Wedding' take place?",
        answers: ["Winterfell", "Dragonstone", "Casterly Rock", "Riverrun"],
        rightAnswer: 3
    }, {
        question: "Which dragon did Daenerys ride most frequently?",
        answers: ["Drogon", "Rhaegal", "Viserion", "Aegon"],
        rightAnswer: 0
    }, {
        question: "At the beginning of the series, how many children do Ned and Catelyn Stark have?",
        answers: ["Four", "Five", "Three", "Six"],
        rightAnswer: 1
    }
];
// KEY VARIABLES

//identifier for the instance of set internal call;
var sid;

//Amount of time left to complete the quiz.
var timeLeft = 50000; //start at 50 seconds or 50000 milliseconds

//index of question to retrieve, default to 0.
var nextQuestion = 0;

//Number of points to award for every correct answer.
var award = 500;

//Number of seconds to deduct for every wrong answer.
var penalty = 15;

//Bucket for score, starts at 0.
var score = 0;

//To compare right answer to chosen answer
var rightAnswer;

//The key to use for storing the high scores in and retrieving the high scores from local storage.
const LS_KEY = "High Scores";

//A collection of high scores
var highScoreArray = [
    {
        name: "Kamala Harris",
        score: 2500
    },
    {
        name: "Joe Biden",
        score: 1500
    },
    {
        name: "Donald Trump",
        score: 500
    },
    {
        name: "Gavin Newsome",
        score: 1300
    },
    {
        name: "Mike Pence",
        score: 700
    },
    {
        name: "Leslie Knope",
        score: 2500
    }, 
    {
        name: "Ron Swanson",
        score: 1200
    }
];

//FUNCTIONS FOR MAJOR TASKS
function setup () {

    showOpeningMessage();

    $("#startBtn").on("click", function startQuiz () {
        $("#welcomeDiv").hide();
        $("#startBtn").hide();
        $("#ready").hide();
        $('.rollQuestions').removeClass('hidden');
        $("#instructionsModal").modal('show');     
        // startTimer();
        // showQuestionAndAnswer(nextQuestion)
    });

    $(".rollQuestions").on("click", function () {
        $("#instructionsModal").modal('hide');
        $("#welcomeDiv").hide();
        $("#ready").hide();
        console.log('Rolling quiz. Time left = ' + timeLeft);
        $("#rollQuestions").removeClass('hidden');
        // alert("The timer will start with 75 seconds on the clock as soon as you click OK.")
        startTimer();
        showQuestionAndAnswer(nextQuestion)
    });

    $('#resetBtn').on("click", function () {
        $('#welcomeDiv').removeClass('hidden');
        $('#ready').removeClass('hidden');
        $("#instructionsModal").modal('show');    
    });

    postScore();
}

function showOpeningMessage () {
    $("#startBtn").show();
    $('#welcomeDiv').removeClass('hidden');
    $('#welcomeDiv').show("slow");
    $('#ready').show("slow");
    $('#yes').removeClass('hidden');
}

function startTimer() {
    timeLeft = 50;
    setInterval(runClock, 1000)
}

function stopTimer() {
    alert('TIME EXPIRED!');
    if (confirm("Do you want to try again?"))
        resetGame();
    clearInterval(sid);
}

function runClock() {
    $('#counter').text(timeLeft);
    if (timeLeft < 1) {
        stopTimer();
    } else {
        var newTime = --timeLeft;
        // console.log(timeLeft);
        $('#counter').text(newTime);
        return timeLeft
    }
}

function showQuestionAndAnswer(nextQuestion) {
    console.log("Next Question Up: ", nextQuestion);
    $('#questionsContainer').removeClass('hidden');
    $('#answerList').removeClass('hidden');
    var QNAObject = {};

    if (nextQuestion === QandA.length || timeLeft < 1) {
        endGame();
    }

    else {
        for (var i = 0; i < QandA.length; i++) {
            QNAObject = QandA[nextQuestion];
            // var question = QandA[nextQuestion].question;
            var answers = QandA[nextQuestion].answers;
            var answerOptionID = QandA[nextQuestion].answers.indexOf(answers);
            rightAnswer = QandA[nextQuestion].rightAnswer;
            console.log("QNA Object: ", QNAObject);

            // Post next question
            $('#questionsContainer').text(QNAObject.question);

            // Post Answers
            for (var i = 0; i < QNAObject.answers.length; i++) {
                var answerOption = QNAObject.answers[i];
                var answerOptionID = QNAObject.answers.indexOf(answerOption);
                $("#answerList").append(`<li><button class="btn list-group-item answerListItem" id="${answerOptionID}">${answerOption}</button></li>`);
            }
        }

    console.log("Right Answer to question "+nextQuestion+" is at index: ", rightAnswer);

    }
}

function showQuestionAndAnswer2(nextQuestion) {
    console.log("Next Question Up: ", nextQuestion);
    $('#questionsContainer').removeClass('hidden');
    $('#answerList').removeClass('hidden');
    var QNAObject = {};

    if (nextQuestion === QandA.length || timeLeft < 1) {
        endGame();
    }

    else {
        //TO DO: REWRITE THIS AS A MAP FUNCTION
        for (var i = 0; i < QandA.length; i++) {
            QNAObject = QandA[nextQuestion];
            var question = QandA[nextQuestion].question;
            var answers = QandA[nextQuestion].answers;
            var answerOptionID = QNAObject.answers.indexOf(answers);
            rightAnswer = QandA[nextQuestion].rightAnswer;
            // console.log("QNA Object: ", QNAObject);
            

            // Post next question
            $('#questionsContainer').text(question);

            // Post Answers
            //TO DO: REWRITE THIS AS A MAP FUNCTION
            for (var i = 0; i < QNAObject.answers.length; i++) {
                var answerOption = QNAObject.answers[i];
                var answerOptionID = QNAObject.answers.indexOf(answerOption);
                $("#answerList").append(`<li><button class="btn list-group-item answerListItem" id="${answerOptionID}">${answerOption}</button></li>`);
            }
        }

    console.log("Right Answer to question "+nextQuestion+" is at index: ", rightAnswer);

    }
}

function clearAnswers() {
    $("#answerList").replaceWith(`<ol id="answerList" class="list-group answerList"></ol>`);
}

function checkAnswer(chosen, rightAnswer) {

    // console.log("Running checkAnswer function");
    // console.log("RightAnswer: ", rightAnswer);
    console.log("Chosen: ", chosen);

    if (chosen == rightAnswer) {
        score = score + award;
        console.log("Correct! 500 points added to your score!")
    } else {
        penaltyDeduct();
    }

    postScore();    
    clearAnswers();
    nextQuestion++;

    showQuestionAndAnswer(nextQuestion)
}

function penaltyDeduct () {
    timeLeft = timeLeft - penalty
    console.log('Wrong Answer! A penalty was deducted from your time.')
    return timeLeft
}

function postScore () {
    $("#score").text("Score: " + score)
}

function resetGame(){
    score = 0;
    nextQuestion = 0;
    location.reload();
    showOpeningMessage();
    startTimer();
    showQuestionAndAnswer(nextQuestion)
}


function endGame () {

    //hide question containers
    $('#questionsContainer').addClass('hidden');
    $('#answerList').addClass('hidden');

    //Alert player to results
    alert("GAME OVER! Your end score is "+ score);
    
    //If score is among top five, prompt to add name and score to High Scores list then view High Scores List
    var topFive = sortScores();

    if (score >= topFive[4].score) {
        alert("CONGRATULATIONS! YOU'RE ONE OF OUR TOP SCORERS!")
        addHighScore(score);
    } 
    
    else if (score < topFive[4].score) {
        alert("Oh dear. Epic failure. You don't know this show at all do you?")
    }

    else {
    //If score < highScoreLine, confirm try again
        resetGame()
    }
}

function addHighScore (score) {
    var playerObj = {};
    playerObj.name = prompt("Enter your player name");
    playerObj.score = score;
    highScoreArray.push(playerObj);
    console.log("Player score posted: ", playerObj);
    postHighScores();
    $("#highScoresModal").modal("show");
    return playerObj;
}

function sortScores () {
    highScoreArray.sort(function(a,b){return b.score - a.score})
    var topFive = highScoreArray.slice(0,5);
    // console.log("High Scores after SORT: ", highScoreArray);
    // console.log("Top Five: ", topFive);
    return topFive
}

function postHighScores () {
    // console.log("High Scores Array", highScoreArray);
    $("#highScoresRows").replaceWith(`<tbody id="highScoresRows"></tbody>`);
    var topFive = sortScores();
    var rank = 0;

    topFive.forEach(player => {
        rank ++;
        $("#highScoresRows").append(`<tr><th scope="row">${rank}</th><td>${player.name}</td><td>${player.score}</td></tr>`)
    })
}

function viewHighScores() {
    //Get a reference to the container where this info will be displayed.
    //Retrieve saved high scores from local storage, if any.
    //Iterate through list of high scores and create HTML elements for name and score.
    //Set this list as the contents of the referenced container.
    //Hide all sibling containers and make this container visible.
    //Return values retrieved from local storage by key.
    // function getValuesFromLS(key) {
    // }

    //store values in local storage under a key.
    function saveToLS() {
        localStorage.setItem(LS_KEY, highScoreArray);
        //convert to string
        JSON.stringify(values)
        localStorage.getItem(LS_KEY, highScoreArray);
        //convert from string
        JSON.parse(values)
    }
}

$( document ).ready(function() {

    setup();
    postHighScores(highScoreArray);

    $(document).on('click', ".answerListItem", function() {
        var chosen = $(this).attr("id");
        checkAnswer(chosen, rightAnswer);
    });
});

// $('#element').show("slow");

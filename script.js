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
var timeLeft = 75000; //start at 75 seconds or 75000 milliseconds

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
var highScoreArray = [];

//FUNCTIONS FOR MAJOR TASKS
function setup () {

    $("#startBtn").on("click", function startQuiz () {
        showOpeningMessage();
        $('hero-text').addClass('hidden')
        $('#startBtn').addClass('hidden');
        $('.rollQuestions').removeClass('hidden');
    });

    $(".rollQuestions").on("click", function () {
        $("#instructionsModal").modal('hide');
        console.log('Rolling quiz. Time left = ' + timeLeft);
        $("#rollQuestions").removeClass('hidden');
        // alert("The timer will start with 75 seconds on the clock as soon as you click OK.")
        startTimer();
        showQuestionAndAnswer(nextQuestion)
    });

    $('#yes').on("click", function () {
        console.log("Yes button clicked");
        $('#welcomeDiv').addClass('hidden');
        $('#ready').addClass('hidden');
    });

    postScore();

}

function showOpeningMessage () {
    $('#welcomeDiv').removeClass('hidden');
    $('#ready').append("Ready to Start?");
    $('#yes').removeClass('hidden');
}

function startTimer() {
    timeLeft = 75;
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
    $('#rollQuestions').addClass('hidden');
    $('#questionsContainer').removeClass('hidden');
    $('#answerList').removeClass('hidden');
    var QNAObject, div;

    for (var i = 0; i < QandA.length; i++) {
        // Create an object with next question elements for easier reference
        QNAObject = QandA[nextQuestion];
        QNAObject.question = QandA[nextQuestion].question;
        QNAObject.answers = QandA[nextQuestion].answers;
        rightAnswer = QandA[nextQuestion].rightAnswer;
        // console.log(QNAObject);

        // Post next question
        $(questionsContainer).text(QNAObject.question);

        // Post Answers
        for (var i = 0; i < QNAObject.answers.length; i++) {
            var answerOption = QNAObject.answers[i];
            var answerOptionID = QNAObject.answers.indexOf(answerOption);
            $("#answerList").append(`<li><button class="btn list-group-item answerListItem" id="${answerOptionID}">${answerOption}</button></li>`);
        }
    }
    console.log("Right Answer to question #"+answerOptionID+": ", rightAnswer);
}

function clearAnswers() {
    $("#answerList").replaceWith(`<ol id="answerList" class="list-group answerList"></ol>`);
}

function checkAnswer(chosen, rightAnswer) {

    console.log("Running checkAnswer function");
    // console.log("This =", this)
    console.log("RightAnswer: ", rightAnswer);
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
    startTimer();
    showQuestionAndAnswer(nextQuestion)
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

    $(document).on('click', ".answerListItem", function() {
        var chosen = $(this).attr("id");
        console.log("Chosen: ", chosen);
        // return chosen
        checkAnswer(chosen, rightAnswer);
    });
});

// $('#element').show("slow");

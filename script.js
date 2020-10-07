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

//The key to use for storing the high scores in and retrieving the high scores from local storage.
const LS_KEY = "High Scores";

//A collection of high scores
var highScoreArray = [];

//FUNCTIONS FOR MAJOR TASKS
function setup () {

    $(".answerListItem").on('click', function () {
        var chosen = this.QNAObject.answers[i];
        console.log("Clicked on answerListItem: ", chosen)
        checkAnswer(chosen);
    });

    $("#startBtn").on("click", function startQuiz () {
        showOpeningMessage();
        $('welcomeDiv').addClass('hidden');
        $('hero-text').addClass('hidden')
        $('#startBtn').addClass('hidden');
        $('.rollQuestions').removeClass('hidden');
    });

    $(".rollQuestions").on("click", function () {
        $("#instructionsModal").modal('hide');
        console.log('Rolling quiz. Time left = ' + timeLeft);
        $(".rollQuestions").addClass('hidden');
        alert("The timer will start with 75 seconds on the clock as soon as you click OK.")
        startTimer();
        showQuestionAndAnswer(nextQuestion)
    });
}

function showOpeningMessage () {
    $(welcomeDiv).text("Hello")
    // "Following are five questions related to the books and blockbuster HBO series. Once you click start, you'll have 75 seconds to choose from several answers. Easy right? Except, if you answer incorrectly, you'll get a time penalty and 15 seconds will be taken off the clock. Ready? Good luck!")
    // $(welcomeDiv).append(`<button id="rollQuestions" class="startBtnDiv btn btn-warning">Start quiz</button>`);
}

function startTimer() {
    timeLeft = 75;
    setInterval(runClock, 1000)
}

function stoptimer() {
    console.log('Timer stopped');
    clearInterval(sid);
    $config.endtime_message ='Timer expired!';
}

function runClock() {
    $('#counter').text(timeLeft);
    if (timeLeft === 0) {
        stopTimer();
    } else {
        var newTime = --timeLeft;
        // console.log(timeLeft);
        $('#counter').text(newTime);
        return timeLeft
    }
}

function showQuestionAndAnswer(nextQuestion) {
    $('.rollQuestions').addClass('hidden');
    var QNAObject, div, ul, li, button;

    for (var i = 0; i < QandA.length; i++) {
        QNAObject = QandA[nextQuestion];
        QNAObject.question = QandA[nextQuestion].question;
        QNAObject.answers = QandA[nextQuestion].answers;
        QNAObject.rightAnswer = QandA[nextQuestion].rightAnswer;
        console.log(QNAObject);

        // Create Question div
        div = $('<div></div>');
        div.addClass('question');
        div.text(QNAObject.question);
        $(questionsContainer).append(div);

        for (var i = 0; i < QNAObject.answers.length; i++) {
            var answerOption = QNAObject.answers[i];
            var answerOptionID = QNAObject.answers.indexOf(answerOption);
            $("#answerList").append(`<li><button class="btn list-group-item answerListItem" id=${answerOptionID}>${answerOption}</button></li>`);
            console.log("answerOptionID: ",answerOptionID)
        }
    }

    nextQuestion++;
    console.log("Right Answer:", QNAObject.rightAnswer);
    return QNAObject.rightAnswer;
}

function checkAnswer(chosen) {
    // var chosen = $(select.answerListItem).val();
    console.log("Running checkAnswer function");
    console.log("This =", this)
    console.log("qao.rightAnswer: ", QNAObject.rightAnswer);
    console.log("Chosen: ", chosen);

    if (chosen === QNAObject.rightAnswer) {
        //TODO: awward points
        score = score + award
    } else {
        penaltyDeduct();
        // TODO: deduct time from timer
    }
}

function penaltyDeduct () {
    timeLeft = timeLeft - penalty
    return timeLeft
    console.log('Sorry, a penalty was deducted from your time.')
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

setup()
      
    // $("#instructionsModal").modal('show');
});
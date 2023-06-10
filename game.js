var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$('.start-btn').on("click", function () {
    if(level===0) {
        nextSequence();
    }
})

$(document).on("keydown", function () {
    if(level===0) {
        nextSequence();
    }
})

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function () {
        $(currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // console.log(currentLevel);
        // console.log(level-1);
        // console.log("Success");

        if(userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1200);
        }
    }

    else {

        // console.log("Fail");

        playSound("wrong")
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$('.btn').on("click", function () {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    animatePress(this);
    playSound(userChosenColor);

    // console.log(gamePattern);
    // console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);
})
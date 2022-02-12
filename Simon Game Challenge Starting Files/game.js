var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {

  userClickedPattern = [];
  levelChange();
  // generate random number
  var randomNumber = Math.floor(Math.random() * 4 );

  // generate random colour
  var randomChosenColour = buttonColours[randomNumber];

  // add the generated colour to the array
  gamePattern.push(randomChosenColour);

  // flash animation
  var flashItem = $("#"+randomChosenColour);
  flashItem.fadeOut(80).fadeIn(80);

  // play sound of the selected colour
  playSound(randomChosenColour);

}

// eventListener for click
$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// play sound corresponding to the colour
function playSound(colour) {
  var audio = new Audio("sounds/"+colour+".mp3");
  audio.play();
}

// animate when click
function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout($("#"+currentColour).removeClass("pressed"),100);
}

function levelChange() {
  level++;
  $("h1").text("Level "+level);
}

$(document).keypress(function() {
  if (gameStarted === false) {
    gameStarted = true;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
  } else {
    endGame();
  }

}

function endGame(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart.");
    startOver();
  },200);

}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  level = 0;
}

var gamePattern = [];
var userClickPattern = [];

var yellow = new Audio('sounds/yellow.mp3');
var red = new Audio('sounds/red.mp3');
var blue = new Audio('sounds/blue.mp3');
var green = new Audio('sounds/green.mp3');
var wrong = new Audio('sounds/wrong.mp3');
var level = 0;
var toggleStart = false;

$(document).keypress(function(event) {
  if (event.key == "a" && toggleStart ==false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    toggleStart = true;
  }
  console.log(event);
});


function checkAnswer(currenLevel) {
  if(userClickPattern[userClickPattern.length-1] == gamePattern[gamePattern.length -1]){
    console.log("success");
          nextSequence();
  }
  else{
    var activeButton = $("body");
    activeButton.addClass("game-over");
    setTimeout(function() {
    activeButton.removeClass("game-over");
    }, 200);
    wrong.play();
    console.log("failed");
    startOver();

  }
}


$('.btn').click(function() {
  if (toggleStart == true) {
    var userChoosenColour = this.id;
    userClickPattern.push(userChoosenColour);
    console.log(userClickPattern);
    console.log(gamePattern);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    if(userClickPattern.length == gamePattern.length){
      checkAnswer(level);

    }
  }

});



function nextSequence() {
  userClickPattern = [];
  var buttonColors = ["red", "blue", "green", "yellow"];
  var randomNumber = Math.random();

  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChoosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColour);
  level++;
  $("#level-title").text("Level " + level);
  $('#' + gamePattern[gamePattern.length -1]).fadeOut(250).fadeIn(250);

  console.log(level);
  console.log(gamePattern);

}

function playSound(input) {
  switch (input) {
    case "yellow":
      $('#yellow').fadeOut(250).fadeIn(250);
      yellow.play();
      break;
    case "red":
      $('#red').fadeOut(250).fadeIn(250);
      red.play();
      break;
    case "blue":
      $('#blue').fadeOut(250).fadeIn(250);
      blue.play();
      break;
    case "green":
      $('#green').fadeOut(250).fadeIn(250);
      green.play();
      break;
    case "wrong":
      wrong.play();
      break;

    default:

  }
}

function animatePress(currenColour) {
  var activeButton = document.querySelector("." + currenColour);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 200);
}

function startOver(){
  level =0;
  gamePattern =[];
  userClickPattern= [];
  toggleStart = false;
      $("#level-title").text("Press A Key to Start");
}

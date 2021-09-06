var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;


function nextSequence(){
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var colourId = "#" + randomChosenColour;
  $(colourId).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("level "+level);



}

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started = true;
  }
})


  $(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  })



  function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();

  }

  function animatePress(currentColour){
    var colourId = "#" + currentColour;
    $(colourId).addClass("pressed");
    setTimeout(function () {
      $(colourId).removeClass("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(gamePattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);}
    }else{
      sound = new Audio("sounds/wrong");
      sound.play();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();

    }
  }
function startOver(){
  level = 0;
  started = false;
  userClickedPattern = [];
  gamePattern = [];
}

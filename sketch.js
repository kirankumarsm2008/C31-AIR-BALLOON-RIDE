var balloon, balloonImage1, balloonImage2,bg;
// create database and position variable here
var database;
var height;

function preload() {
  bg = loadImage("cityImage.png");
  balloonImage1 = loadAnimation("hotairballoon1.png");
  balloonImage2 = loadAnimation("hotairballoon1.png",   "hotairballoon2.png","hotairballoon3.png");
}

//Function to set initial environment
function setup() {

  database = firebase.database()
  createCanvas(1350, 640);

  balloon = createSprite(250, 450, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;


  balloonPosition = database.ref('balloon/height')
  balloonPosition.on("value", readHeight, showError())


}

// function to display UI
function draw() {
  background(bg);

  if (keyDown(LEFT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    writeHeight(-10,0)

  }
  else if (keyDown(RIGHT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    writeHeight(10,0)
  }
  else if (keyDown(UP_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    writeHeight(0,-10)
  }
  else if (keyDown(DOWN_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    writeHeight(0,10)
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
}

function writeHeight(x, y) {

  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  
  })
}

function readHeight (data) {
  
  height = data.val()
  balloon.x = height.x;
  balloon.y = height.y;

}

function showError() {
   console.log("it contains an error")
}
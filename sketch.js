var birdImg, bird, birdImg2;
var pipeImg, pipe, pipe1, pipe2, pipe3 , pipeGroup;
var backgroundImg, restartImg , restart;
var gameOverImg , birdflappy, gameOver;

function preload(){



birdImg = loadImage("yellowbird.png");
pipeImg =  loadImage("pipe1.png");
pipe1 = loadImage("pipe2.png");
pipe2 = loadImage("download.png");
pipe3 = loadImage("pipe3.png");
gameOverImg = loadImage("gameover.png");
restartImg = loadImage("restart.png");
backgroundImg = loadImage("background.png");
birdflappy = loadImage("flappybird.jpg");

}

function setup(){
  createCanvas(600,200)

  birdImg = createSprite(20,100,45,45);
  gameOverImg = createSprite(100,50);
  restartImg = createSprite(100,40);
  birdflappy = createSprite(150,60);

  restartImg.scale = 0.5;
  gameOverImg.scale = 0.5;

  restartImg.visible = false;
  gameOverImg.visible = false;

  pipeGroup = new pipeGroup();

}

function draw(){
  background(backgroundImg);
  text("Score: "+ score, 500,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  }
    if (KeyIsDown("RIGHT_ARROW")){
    bird.velocityX = 3
    }
  
   if(KeyIsDown("UP_ARROW")){
     bird.velocityY = -2
   }
 
   if(KeyIsDown("DOWN_ARROW")){
     bird.velocityY = 4
   }

   if(pipeGroup.isTouching(bird)){
     gameState = END;
   }

   else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   }

   pipeGroup.setLifetimeEach(-1);

   if(mousePressedOver(restart)) {
    reset();
   }

}

drawSprite();{
    
  function pipes(){
    if (frameCount % 60 === 0) {
      var pipe= createSprite(600,120,40,10);
      pipe.velocityX = -3;

      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: pipe.addImage(pipe1);
                break;
        case 2: pipe.addImage(pipe2);
                break;
        case 3: pipe.addImage(pipe3);
                break;
        case 4: pipe.addImage(pipeImg);
                break;
      default : break;
      }
      pipe.scale = 0.5;
      pipe.lifetime = 300;
      pipeGroup.add(pipe);
  
  }
}
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  pipeGroup.destroyEach();


  score = 0;

}

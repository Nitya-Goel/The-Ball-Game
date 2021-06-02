const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;

var engine, world;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ball, ballImg;
var bg, backgroundImg;
var star, starImg, starsGroup;
var enemy1, enemy1Img, enemy2, enemy2Img, enemy3, enemy3Img, enemy4, enemy4Img, enemyGroup
var starEnemy, starEnemyImg, starEnemyGroup;
var gameOver, gameOverImg;
var restart, restartImg;
var score=0;
var star_s=0;
function preload(){
  ballImg= loadImage("ball.png");
  backgroundImg= loadImage("bg.jpg");
  starImg= loadImage("star.png");
  enemy1Img= loadImage("m1.png");
  enemy2Img= loadImage("m2.png");
  enemy3Img= loadImage("m3.png");
  enemy4Img= loadImage("m4.png");
  starEnemyImg= loadImage("star1.png")
  restartImg= loadImage("restart.png");
  gameOverImg= loadImage("gameover.png");
}



function setup() {
  createCanvas(580,400);
  engine=Engine.create();
  world=engine.world;

  ball=createSprite(50, 200, 50, 50);
  ball.addImage(ballImg);
  ball.scale=0.2;
  
  bg=createSprite(50, 200, 2000, 800)
  bg.addImage(backgroundImg);
  bg.scale=1.2

  invisibleGround = createSprite(400, 360, 1600, 10);
  invisibleGround.visible = false;

  gameOver= createSprite(500, 500, 50, 50);
  gameOver.addImage(gameOverImg);
  gameOver.visible= false;

  restart= createSprite(500, 600, 50, 50);
  restart.addImage(restartImg);
  restart.visible= false;

  starsGroup= new Group();
  enemyGroup= new Group();
  starEnemyGroup= new Group();
}

function draw() {
  background(0); 
  
  if(gameState===PLAY)
  {
    invisibleGround.velocityX=-5
 

      if(invisibleGround.x<0)
        {
         invisibleGround.x=invisibleGround.width/2;
        }

         bg.velocityX=-3;

      if(bg.x<200)
        { 
         bg.x=bg.width/2;
        }
      if(keyDown("space") && ball.y >= 180) 
        {
         ball.velocityY = -12;
        }
         ball.velocityY = ball.velocityY + 0.8
         ball.rotationSpeed=10;
         ball.collide(invisibleGround);

      if(frameCount%5===0)
        {
          score= score+3;
        }

      if(starsGroup.isTouching(ball))
        {
         star_s+=1;
         starsGroup.destroyEach();
        }

         spawnEnemies();
         spawnStars();
         spawnStarEnemies();
        }

  if(ball.isTouching(enemyGroup)|| ball.isTouching(starEnemyGroup))
    {
     gameState=END;
    
    }
  if(gameState===END)
    {
     bg.velocityX=0;
     ball.visible=false;
     gameOver.visible=true;
     restart.visible=true;
     ball.rotationSpeed=0;
     starEnemyGroup.setVisibleEach(false);
     enemyGroup.setVisibleEach(false);
     starsGroup.setVisibleEach(false);
     starsGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     starEnemyGroup.setVelocityXEach(0);
     starsGroup.setLifetimeEach(-1);
     enemyGroup.setLifetimeEach(-1);
     starEnemyGroup.setLifetimeEach(-1);


      if(mousePressedOver(restart))
       {
        reset();
       }
    }

  drawSprites();

  fill("orange");
  stroke("black");
  strokeWeight(3)
  textSize(17);
  text("Score:" + score,500,50);
  text("Stars:" + star_s,400,50)
}
function spawnStars()
 {
    if(frameCount%120===0)
     {
      var star=createSprite(600, 200, 10, 10);
      star.addImage(starImg);
      star.scale= 0.15;
      star.y=Math.round(random(100, 200));
      star.velocityX=-5;
      star.lifetime= 300;
      star.depth= ball.depth;
      ball.depth= ball.depth+1;
      starsGroup.add(star);
     }
 }
function spawnEnemies()
 {
    if(frameCount % 150===0)
     {
      r= Math.round(random(1, 4));
       if(r===1)
        {
          enemy1= createSprite(600, 330, 10, 10);
          enemy1.addImage(enemy1Img);
          enemy1.scale=0.3;
          enemy1.velocityX=-6;
          enemy1.lifetime=300;
  
          enemyGroup.add(enemy1);
        }
       else if(r===2)
        {
          enemy2= createSprite(600, 330, 10, 10);
          enemy2.addImage(enemy2Img);
          enemy2.scale=0.3;
          enemy2.velocityX=-6;
          enemy2.lifetime=300;
  
          enemyGroup.add(enemy2);
        }
       else if(r===3)
        {
          enemy3= createSprite(600, 330, 10, 10);
          enemy3.addImage(enemy3Img);
          enemy3.scale=0.3;
          enemy3.velocityX=-6;
          enemy3.lifetime=300;
        
          enemyGroup.add(enemy3);
        }
       else if(r===4)
        {
          enemy4= createSprite(600, 330, 10, 10);
          enemy4.addImage(enemy4Img);
          enemy4.scale=0.3;
          enemy4.velocityX=-6;
          enemy4.lifetime=300;
        
          enemyGroup.add(enemy4);
        }
    }
  }
function spawnStarEnemies()
 {
    if(frameCount%200===0)
      {
        var starEnemy=createSprite(600, 100, 10, 10);
        starEnemy.addImage(starEnemyImg);
        starEnemy.scale= 0.2;
        starEnemy.velocityX=-12;
        starEnemy.lifetime= 300;
        starEnemy.rotationSpeed=-10;
        starEnemy.depth= ball.depth;
        ball.depth= ball.depth+1;
        starEnemyGroup.add(starEnemy);
      }
 }
function reset() 
 {
    gameState = PLAY;
    score = 0;
    star_s = 0;
    restart.visible = false;
    gameOver.visible = false;
    enemyGroup.destroyEach();
    starsGroup.destroyEach();
    starEnemyGroup.destroyEach();
    
 }
var king;
var kingImage,backgroundImg;
var obstacle1,obstacle2,obstacle3,obstaclesGroup
var sword
var score = 0;
var PLAY = 1;
var END = 0;
var canvas;

var gameState = PLAY;
var sword,swordimg,swordsGroup;
function preload(){
    kingImage = loadAnimation("images/king1.png","images/king2.png","images/king3.png")
    backgroundImg = loadImage("images/bg3.jpg")
    obstacle1 = loadImage("images/obstacle1.png")
    obstacle2 = loadImage("images/obstacle2.png")
    obstacle3 = loadImage("images/obstacle3.png")
    swordimg = loadImage("images/sword.png")
}

function setup(){
  canvas= createCanvas(displayWidth-100,displayHeight-100);
    
    
    king = createSprite(200,530,250,200)
    king.addAnimation("running",kingImage)

    
    obstaclesGroup = new Group()
   swordsGroup = new Group()
    
}
function draw(){
    
    background(backgroundImg)
   
    fill("white")
    textSize(30)
    text("Score "+score,100,100)
   

    if(gameState===PLAY){

        if(keyDown(UP_ARROW)){
        king.velocityY=-2
    }

    if(keyDown(DOWN_ARROW)){
        king.velocityY=2
    }

     if(king.isTouching(obstaclesGroup)){
         obstaclesGroup[0].destroy()
        gameState = END;

    }

    if(king.isTouching(swordsGroup)){
        swordsGroup.destroyEach();
        score = score + 1;
        //swordGroup[0].destroyEach()
    }
    spawnObstacles()
    spawnSword()
     }
        
        drawSprites()
        
    if(gameState === END){
        textSize(30)
        text("Game Over",400,400)
    
    }
}
function spawnObstacles(){
    if(frameCount % 70===0){
        obstacle = createSprite(displayWidth,random(100,700),10,10)
        obstacle.velocityX=(-5)
        var rand = Math.round(random(1,3))
        console.log(rand)
        switch(rand){
            case 1: obstacle.addImage(obstacle1)
            break;
            case 2: obstacle.addImage(obstacle2)
            break;
            case 3: obstacle.addImage(obstacle3)
            break
            default: break
        }
        obstacle.lifetime=displayWidth*1
        obstaclesGroup.add(obstacle)
    }
}

function spawnSword(){
    if(frameCount % 150 ===0){
        sword = createSprite(displayWidth,random(100,700),10,10)
        
        sword.velocityX = -5
        sword.addImage(swordimg)
        sword.scale=0.3
        sword.lifetime=300;
        sword.debug=true;
        sword.setCollider("circle",0,0,40)
     swordsGroup.add(sword);
    }
}
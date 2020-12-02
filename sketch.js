const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box = [];
var logs = [];
var pig = [];
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box[0] = new Box(700,320,70,70);
    box[1] = new Box(920,320,70,70);
    box[2] = new Box(700,240,70,70);
    box[3] = new Box(920,240,70,70);
    box[4] = new Box(810,160,70,70);

    pig[0] = new Pig(810, 350);
    pig[1] = new Pig(810, 220);

    logs[0] = new Log(810,260,300, PI/2);
    logs[1] = new Log(810,180,300, PI/2);
    logs[2] = new Log(760,120,150, PI/7);
    logs[3] = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    }
    
    Engine.update(engine);

    ground.display();
    bird.display();
    platform.display();
    slingshot.display();

    for(var i = 0; i < logs.length; i++){
        logs[i].display()    
    }
    for(var i = 0; i < box.length; i++){
        box[i].display();
    }
    for(var i = 0; i < pig.length; i++){
        pig[i].display();
        pig[i].score();
    }
    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        Matter.Body.setPosition(bird.body, {x: 215 , y: 55});
       slingshot.attach(bird.body);
       bird.trajectory = [];
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
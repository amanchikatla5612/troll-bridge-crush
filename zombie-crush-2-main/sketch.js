const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var uglytroll;
var uglytrollright, uglytroll2, uglytroll3, uglytroll4;
var breakButton;
var backgroundImage;
var uglytrolldead

var stones = [];

function preload() {
  uglytrollright = loadImage("./assets/uglytroll.png");
  uglytroll2 = loadImage("./assets/uglytroll2.png");
  uglytrolldead = loadImage("./assets/uglytrolldead.png");

  

  backgroundImage = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  uglytroll = createSprite(width / 2, height - 105);
  uglytroll.addAnimation("lefttoright", uglytroll2);
  uglytroll.addAnimation("righttoleft", uglytrollright);
  uglytroll.addAnimation("uglytrolldead", uglytrolldead);
  uglytroll.scale = 0.27;
  uglytroll.velocityX = 10;

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  for (var stone of stones) {
    stone.show();
  }

  if (uglytroll.position.x >= width - 300) {
    uglytroll.velocityX = -10;
    uglytroll.changeAnimation("righttoleft");
  }

  if (uglytroll.position.x <= 300) {
    uglytroll.velocityX = 10;
    uglytroll.changeAnimation("lefttoright");
  }

  drawSprites();
}

function handleButtonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
    uglytroll.velocityX = 0;
    uglytroll.changeAnimation("uglytrolldead");
    setTimeout(() => {
      alert("Good job! You have destroyed the troll!")
    }, 500);
    
  }, 900);

  
}

const Engine = Matter.Engine;
// render to display
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
// constraint = connect 2 bodies
const Constraint = Matter.Constraint;
const Body = Matter.Body;
// composites = to store multiple rectangles in single variable
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
let fruit;
var rope;
var link;
var rabbit, buttonImg, bg, melon;

var blinking, eating, sad;

function preload(){
rabbit = loadImage("Rabbit-01 (1).png");
buttonImg = loadImage("cut_button.png");
bg = loadImage("garden_bg.jpg");
melon = loadImage("carrot.png");

blinking = loadAnimation("imgs/blink_1.png", "imgs/blink_2.png", "imgs/blink_3.png");
eating = loadAnimation("imgs/eat_0.png", "imgs/eat_1.png", "imgs/eat_2.png", "imgs/eat_3.png", "imgs/eat_4.png");
sad = loadAnimation("imgs/sad_1.png", "imgs/sad_2.png", "imgs/sad_3.png");

blinking.playing = true;

sad.playing = true;
sad.looping = false;

eating.playing = true;
eating.looping = false;
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(300,700,600,20);

  rope = new Rope(7, {x: 245, y:30})

blinking.frameDelay = 20;
sad.frameDelay = 20;
eating.frameDelay = 20;

  bunny = createSprite(250, 600, 100, 100);
  bunny.addImage(rabbit);
  bunny.addAnimation("blinking", blinking);
  bunny.addAnimation("eating", eating);
  bunny.addAnimation("sad", sad);
  bunny.changeAnimation("blinking", blinking);
  bunny.scale = 0.2;

button = createImg("cut_button.png");
button.position(220, 30);
button.size(50, 50);
button.mouseClicked(drop);

  fruit = Bodies.circle(250, 350, 30);
 World.add(world, fruit);

  link = new Link(rope, fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg, 0, 0, 600, 800);
  ground.show();
  
  Engine.update(engine);

  
  push ()
  imageMode (CENTER)
  if(fruit!=null){
    image(melon, fruit.position.x, fruit.position.y, 50, 50)
  }

 pop ()

 if(collision(fruit, ground.body)===true){
  bunny.changeAnimation("sad", sad);
}

if(collision(fruit, bunny)===true){
  bunny.changeAnimation("eating", eating);
}

   rope.show()
   drawSprites()
}

function drop(){
link.detach()
rope.break()
}

function collision(body1, body2){
 if(body1!=null){
    var distance = dist(body1.position.x, body1.position.y, body2.position.x, body2.position.y)
    if(distance<=80){
      World.remove(world, fruit)
      fruit = null
      return true
    }
    else{
      return false
    }
  }
}
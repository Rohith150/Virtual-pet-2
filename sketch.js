//Create variables here
var dog, happyDog, database, foodS, foodStock, milkImg, fedTime, lastFed, foodObj, addFood, feedPet, food;

function preload() {
  //load images here
  dog1 = loadImage('images/Dog.png');
  dog2 = loadImage("images/happyDog.png");
  milkImg = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(1000, 500);

  database = firebase.database();

  dog = createSprite(900, 200, 50, 50);
  dog.addImage(dog1);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  addFood = createButton('Add Food');
  addFood.position(800, 95);
  addFood.mousePressed(AddFood);
  feedPet = createButton('Feed Pet');
  feedPet.position(700, 95);
  feedPet.mousePressed(FeedPet);

  food = new Food();
}


function draw() {
  background(46, 139, 87);

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Fed: " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Fed: 12 AM", 350, 30);
  } else {
    text("Last Fed: " + lastFed + "AM", 350, 30)
  }

  food.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  })

  drawSprites();
}

//Function to read values from Database
function readStock(data) {
  foodS = data.val();
}

//Function to write values from Database
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}

function AddFood() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function FeedPet() {
  dog.addImage(dog2);

  foodS--;

  database.ref('/').update({
    Food: foodS,
    FeedTime: hour()
  })
}

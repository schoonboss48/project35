//Create variables here
var database
var dog,dogImage,dogImage1
var foodStock,foodS
function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png")
  dogImage1=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  database=firebase.database()

  dog=createSprite(250,300,150,150)
  dog.addImage(dogImage)
  dog.scale=0.15
  
  foodStock=database.ref("food")
  foodStock.on("value",readStock)

}


function draw() {  
  background("white")

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImage1)
  }
  drawSprites();
  fill("white")
  stroke("black")
  text("Food Remaining: "+foodS,170,200)
  text("Note: Press Up Arrow key to feed the dog!",130,10,300,20)
  //add styles here

}
function readStock(data){
  foodS=data.val()
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref("/").update({
    food: x
  })
}



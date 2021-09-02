var db;
var gameState = 0;
var playerCount; //undefined
var form, player, game;
var allPlayers; //undefined
var cars; //an array
var car1, car2, car3, car4;
var car1Img, car2Img, car3Img, car4Img;
var trackImg;

function preload()
{
    trackImg = loadImage("images/track.jpg");

    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");
}

function setup()
{
    createCanvas(displayWidth, displayHeight);

    db = firebase.database();
    
    game = new Game();
    game.getState();
    game.start();
}
    
    
                                                        
function draw()
{
    if(playerCount === 4)
    {
        game.updateState(1);
    }
    if(gameState === 1)
    {
        clear(); //clear the form elements
        game.play();
    }
    if(gameState === 2)
    {
        game.end();
    }
}


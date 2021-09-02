class Game
{
    constructor()
    {

    }

    getState()  //This function will read the gameState value from the database (read)
    {
        var gameStateRef = db.ref('gameState');
        gameStateRef.on("value", function(data){gameState = data.val()});
    }

    updateState(state) // This function will update the gamestate value in the database (write)
    {
        db.ref('/').update({gameState: state}); // '/' refers to main database inside which gameState is created
    }

    async start()
    {
        if(gameState === 0)
        {
            player = new Player;
            var playerCountRef = await db.ref('playerCount').once("value"); //once method(asynchronous listener) read the value once from the database
            if(playerCountRef.exists()) //exists() function check if the playerCountRef has a value or not.
            {
                playerCount = playerCountRef.val(); //val() function will extract the data from the data snapshot
                player.getCount(); //To permanently listen to the database
            }

            form = new Form(); //create a form object only after getting playerCount value from the database
            form.display(); //Display the form
        }
        car1 = createSprite(100, 200);
        car1.addImage(car1Img);

        car2 = createSprite(300, 200);
        car2.addImage(car2Img);

        car3 = createSprite(500, 200);
        car3.addImage(car3Img);

        car4 = createSprite(700, 200);
        car4.addImage(car4Img);

        cars = [car1, car2, car3, car4];
    }

    play() //play() function will be called when gameState becomes 1
    {
        form.hideForm(); //hide the form
        textSize(30);
        text("Game Start", 120, 100);

        player.getPlayerInfo();
        player.getFinishedPlayers(); //rank variable will be initialized to 0

        if(allPlayers !== undefined)
        {
            var index = 0; //index of the array cars
            var x = 200;
            var y;
            for(var plr in allPlayers) //in operator will take the key from the first key-value pair in the first ateration & store it in the variable plr
            {
                image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);
                index = index + 1;
                x = x + 225; //position the cars a little away from each other in x-direction
                y = displayHeight - allPlayers[plr].distance; //use distance data from the database to display cars in y-direction
                
                cars[index - 1].x = x; 
                cars[index - 1].y = y; 

                if(plr === "player" + player.index)          
                {                                                         
                    cars[index - 1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index - 1].y;
                }
                else
                {
                    cars[index - 1].shapeColor = "black";
                }
            }
        }

        if(keyIsDown(UP_ARROW))
        {
            player.distance = player.distance + 50;
            player.update();
        }

        if(player.distance === 4200) //Condition to end the game
        {
            gameState = 2;
            player.rank = player.rank + 1;

            textSize(30);
            fill("red");
            text("Rank:" + player.rank, 100, -3600);

            player.updateFinishedPlayers();
        }

        drawSprites();
    }

    end()
    {
        console.log("GAME ENDED!!!");
    }
};
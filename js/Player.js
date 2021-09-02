class Player
{
    constructor()
    {
        this.index = null;
        this.name = null;
        this.distance = 0;
        this.rank = null;
    }

    getCount()  //This function will read the playerCount value from the database (read)
    {
        var playerCountRef = db.ref('playerCount');
        playerCountRef.on("value", function(data){playerCount = data.val();});
    }

    updateCount(count) // This function will update the playerCount value in the database (write)
    {
        db.ref('/').update({playerCount: count, finishedPlayers: 0}); // '/' refers to main database inside which playerCount is created
    }

    update() //This function will update name & distance of the player in the database
    {
        var playerIndex = "players/player" + this.index;   
        db.ref(playerIndex).set({name: this.name, distance: this.distance}); //db.ref().set() will create a variables in the database if not already present
    }

    getPlayerInfo()
    {
        var playerInfoRef = db.ref('players');
        playerInfoRef.on("value", function(data){allPlayers = data.val();});
        console.log(allPlayers);
    }

    getFinishedPlayers() //Read the value of finishedPlayers from the database & store it in rank variable
    {
        db.ref('finishedPlayers').on("value", (data) => {this.rank = data.val();});
    }

    updateFinishedPlayers() //Write or update the value of finishedPlayers into the database according to the value of rank variable
    {
        db.ref('/').update({finishedPlayers: this.rank});
    }

};
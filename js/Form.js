class Form
{
    constructor()
    {
        this.title = createElement('h2'); 
        this.input = createInput("Name"); 
        this.button = createButton('Play');
        this.greeting = createElement('h2');
        this.reset = createButton('Reset');
    }

    hideForm()
    {
        this.greeting.hide(); //hide() method hides the html element
        this.input.hide();
        this.button.hide();
        this.title.hide();
    }

    display()
    {
        this.title.html("Car Racing Game"); //Change the html content within the elements
        this.title.position(displayWidth/2 - 100, 100); //Position the title on the canvas
        
        this.input.position(displayWidth/2 - 200, displayHeight/2 - 100);
        this.button.position(displayWidth/2 + 100, displayHeight/2 - 100);
        this.reset.position(displayWidth - 100, 20);

        this.button.mousePressed(() => { //The button element is calling function mousePressed() & 'this' inside function mousePressed() refers to the button element.
            this.input.hide();           //We want 'this' to refer to the form object. Using arrow function, this refers to the owner(form object) of the function
            this.button.hide();

            playerCount = playerCount + 1;
            player.index = playerCount;
            player.updateCount(playerCount);

            player.name = this.input.value();
            this.greeting.html("Hello " +player.name);
            this.greeting.position(displayWidth/2 - 100, displayHeight/4);
        });

        this.reset.mousePressed(() => {
            player.updateCount(0);
            game.updateState(0);
        })
    }
};
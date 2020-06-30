/* TODO 
    1.) fix generateField.
        1a.) fix nested loop
    2.) add functions to encapsulate some of the code. reduce repeating code.


*/
const prompt = require('prompt-sync')({sigint: true});

const hat = '^'; // represents hat
const hole = 'O'; // represents pitfalls
const fieldCharacter = '░'; // represents neutral area
const pathCharacter = '*';
let realInput = true; // this is neccessary for the do-while logic

class Field {
    constructor(playarea) {
        this._playarea = playarea; //where playarea is a 2-D array
        this._rowPosition = 0;
        this._elementPosition = 0;
        this._startingPosition = playarea[this._rowPosition][this._elementPosition];
        this._currentPosition = this._startingPosition; // equal to a [value, value]
    }
    print(){
        console.log(this._playarea.join('\n'));
    }
    play(){
        console.log('\n');
        console.log("Playing game.");
        this.print(); // shows initial play area.     
        let input;
        
        do {
            input = prompt("Which way?");
            input = input.toLowerCase();

            switch(input) {
                case 'w': // The logic error. Is that case will compare with the parameter automatically. I was saying compare input with the value of true. CORRECTION: Compare input with a character that would evaluate to true.
                    this.moveUp(); // if the input is out of bounds. return false and break out of the program.
                    break;
                case 's':
                    this.moveDown();
                    break;
                case 'a':
                    this.moveLeft();
                    break;
                case 'd':
                    this.moveRight();
                    break;
                default:
                    realInput = false; // run until an unknown value is given.
                    break;
            }
        } while(realInput);
        
    }
    isHat(){
        if(this._playarea[this._rowPosition][this._elementPosition] === hat){
            console.log("You found the hat!!");
            realInput = false; // this will make it so that the do-while is no longer running.
            return;
        }
    }
    /*
    checkBound(){
        if(this._rowPosition === 0 || this._rowPosition === 2 || this._elementPosition === 0 || this._elementPosition === 0){
            console.log("You are out of bounds!");
            realInput = false;
            return;
        }
    }
    */
    moveUp(){
        //this.checkBound();
        if(this._rowPosition === 0) { // if you are calling the moveUp function while the rowPosition is at 0. You will go out of bounds.
            console.log("You are out of bounds! GAME OVER. *too high up* ");
            realInput = false; // this will make it so that the do-while is no longer running.
            return;
        }
        if(this._playarea[this._rowPosition - 1][this._elementPosition] === hole){
            console.log("You have fallen into the abyss.");
            realInput = false; // this will make it so that the do-while is no longer running.
            return;
        }   
        this._rowPosition -= 1; // if it's not out of bounds or dropped into a hole..continue logic.
        this.isHat();
        if(realInput) this._playarea[this._rowPosition][this._elementPosition] = pathCharacter; // if no guard clauses are hit. and the input is real. continue changing grid .
        this.print();
    }
    moveDown(){
        //this.checkBound();
        if(this._rowPosition === 2) { // if you are calling the moveUp function while the rowPosition is at 0. You will go out of bounds.
            console.log("You are out of bounds! GAME OVER. *too far down*");
            realInput = false; // this will make it so that the do-while is no longer running.
            return;
        }
        if(this._playarea[this._rowPosition + 1][this._elementPosition] === hole){
            console.log("You have fallen into the abyss.");
            realInput = false; // this will make it so that the do-while is no longer running.
            return;
        }
        this._rowPosition += 1;
        this.isHat();
        if(realInput) this._playarea[this._rowPosition][this._elementPosition] = pathCharacter; // if no guard clauses are hit. and the input is real. continue changing grid .
        this.print();
        //console.log(this._currentPosition); // for testing purposes.//this._currentPosition = this._playarea[this._rowPosition][this._elementPosition]; for testing purposes.
    }
    moveLeft(){
        //this.checkBound();
        if(this._elementPosition === 0) { // if you are calling the moveUp function while the rowPosition is at 0. You will go out of bounds.
            console.log("You are out of bounds! GAME OVER. *leftist much?*");
            realInput = false; // this will make it so that the do-while is no longer running.
            return;
        }
        if(this._playarea[this._rowPosition][this._elementPosition - 1] === hole){
            console.log("You have fallen into the abyss.");
            realInput = false; // this will make it so that the do-while is no longer running.
            return;
        }
        this._elementPosition -= 1;
        this.isHat();
        if(realInput) this._playarea[this._rowPosition][this._elementPosition] = pathCharacter; // if no guard clauses are hit. and the input is real. continue changing grid .
        this.print();
    }
    moveRight(){
        // CREATE FUNCTIONS LATER.
        //this.checkBound();
        // the first check is the bounds
        if(this._elementPosition === 2) { // if you are calling the moveUp function while the rowPosition is at 0. You will go out of bounds.
            console.log("You are out of bounds! GAME OVER. *ok boomer.*");
            realInput = false; // this will make it so that the do-while is no longer running.
            return;
        }
        // the second check are the holes.
        if(this._playarea[this._rowPosition][this._elementPosition + 1] === hole){
            console.log("You have fallen into the abyss.");
            realInput = false; // this will make it so that the do-while is no longer running.
            return;
        }
        this._elementPosition += 1;
        this.isHat();
        if(realInput) this._playarea[this._rowPosition][this._elementPosition] = pathCharacter; // if no guard clauses are hit. and the input is real. continue changing grid .
        this.print();
    }
    static generateField(height, width){
        const characters = [hole, fieldCharacter];
        let randomIndex;
        let newField = [];
        let rowArray = [];
        // FIX Nested for loop. May be overkill, try and optimize later.
        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                randomIndex = Math.floor(Math.random() * characters.length);
                rowArray.push(characters[randomIndex]);
            }
            newField.push(rowArray); // pass pushed character Array into a newField (total array)
            newField[0][0] = pathCharacter;  // set the top left corner equal to the original pathCharacter.
            rowArray = []; //reset the row that is going to be passed to the newField.
        }
        return newField;
    }
    quit(){
        console.log("Exiting.");
    }
}

const fieldarea = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░']
]);

// Prompt User
/*
fieldarea.print();
const isPlay = prompt("FindYourHat! Y (for play) | N (to exit) ");
if(isPlay.toLowerCase() === 'y') fieldarea.play(); //play will be a higher order function
else fieldarea.quit(); //quick exit prompt
*/

const isPlay = Field.generateField(3, 3);
const testFieldArea = new Field(isPlay);
testFieldArea.play();




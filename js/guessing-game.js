/* 
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm run test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
*/

function generateWinningNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle (arr)
{
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

class Game {
    constructor(){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        return Math.abs(this.playersGuess-this.winningNumber);
    }

    isLower(){
        if (this.playersGuess<this.winningNumber){
            return true;
        }else{
            return false;
        }
    }

    playersGuessSubmission(number){
        let message = "";
        function isValid(num){
            if((num < 1 || num > 100 || isNaN(num))){
                throw new Error ("Invalid Input");
            }
        }
        try{
            isValid(number);
            this.playersGuess = number;
            message = this.checkGuess();
        }catch(e){
            console.error(e);
        }
        return message;
    }

    checkGuess(){
        let message = "";
        //create a count variable before to count numbers of attemps made before going into the following statements
        if(this.pastGuesses.includes(this.playersGuess)){
            message = "You have already guessed that number.";
        }else{    
        if(this.playersGuess==this.winningNumber && this.pastGuesses.length <= 5){
            this.pastGuesses.push(this.playersGuess)
            message = "You Win!";
        }else if(this.difference()<10 && this.pastGuesses.length < 5){
            this.pastGuesses.push(this.playersGuess)
            message = "You're burning up!";
        }else if(this.difference()<25 && this.pastGuesses.length < 5){
            this.pastGuesses.push(this.playersGuess)
            message = "You're lukewarm.";
        }else if(this.difference()<50 && this.pastGuesses.length < 5){
            this.pastGuesses.push(this.playersGuess)
            message = "You're a bit chilly.";
        }
        else if(this.difference()<75 && this.pastGuesses.length < 5){
            this.pastGuesses.push(this.playersGuess)
            message = "You're ice cold!";
        }
        else if(this.pastGuesses.length <= 5 && this.playersGuess!=this.winningNumber){
            message = "You Lose";
        }
    }
        return message;
    }

    newGame(){
        let g2 = new Game();
        return g2;
    }

    provideHint(){
        let hints = [];
        hints.push(this.winningNumber);
        hints.push(generateWinningNumber());
        hints.push(generateWinningNumber());
        shuffle(hints);
        return hints;
    }
}

let submit = document.getElementById("submit");
let hint = document.getElementById("hint");
let reset = document.getElementById("reset");

let game = new Game();

submit.addEventListener("click", function(){
    let output = document.getElementById("outputtext");
    let input = document.getElementById("userInput").value;
    input = parseInt(input);
    output.innerHTML = game.playersGuessSubmission(input);
});

hint.addEventListener("click", function(){
    let output = document.getElementById("outputtext");
    output.innerHTML = game.provideHint();
})

reset.addEventListener("click", () => location.reload());


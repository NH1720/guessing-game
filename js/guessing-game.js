/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/



function generateWinningNumber() {
  let newWinningNumber = Math.ceil(Math.random() * 100);
   return newWinningNumber;
}

function shuffle(array) {
    let m = array.length, t, i;
  
    while (m) {
  
      i = Math.floor(Math.random() * m--);
  
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

function newgame() {

    return {
        playersGuess: null,
        pastGuesses: [],
        winningNumber: generateWinningNumber(),
        difference: function () {
            return Math.abs(this.playersGuess - this.winningNumber);
        },
        isLower: function() {
            return this.playersGuess < this.winningNumber;
        },
        playersGuessSubmission: function(number) {
            this.playersGuess = parseInt(number);
            let checkGuessResult = this.checkGuess();
            let titleElement = document.getElementById("title");
            titleElement.innerHTML = checkGuessResult;


            let guessElements = document.getElementsByClassName("guess");
            for (let i = 0; i < this.pastGuesses.length; i++) {
                guessElements[i].innerHTML = this.pastGuesses[i];
            }

         },
        checkGuess: function() {
            console.log(`playerguess: ${this.playersGuess}`);
            console.log(typeof(this.playersGuess));
            if (this.playersGuess > 100 || this.playersGuess <= 0 || typeof(this.playersGuess) != "number") {
                throw "That is an invalid guess.";
            } else if (this.pastGuesses.includes(this.playersGuess)){
                return "You have already guessed that number.";
            } else if (this.playersGuess === this.winningNumber) {
                return "You Win!"
            } 

            this.pastGuesses.push(this.playersGuess);

            
            if (this.pastGuesses.length >= 5) {
                return "You Lose."
            } else {

                let higherOrLower;

                if (this.playersGuess < this.winningNumber) {
                    higherOrLower = "Guess higher!"
                } else {
                    higherOrLower = "Guess lower!"
                }

                let subtitleElement = document.getElementById("subtitle");
                subtitleElement.innerHTML = higherOrLower;

                let difference = this.difference();
                if (difference < 10) {
                    return "You're burning up!";
                } else if (difference < 25){
                    return  "You're lukewarm.";
                } else if (difference < 50) {
                    return "You're a bit chilly.";
                } else {
                    return "You're ice cold!";
                }

            }
                
        },
        provideHint: function() {
            let hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
            return shuffle(hintArray);
        }
    };
  };
  let game = newgame();

  let guessButton = document.getElementById("guessButton");
  guessButton.addEventListener("click",() => {
    let inputElement = document.getElementById("number");
    game.playersGuessSubmission(inputElement.value);
});
  
  let resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", () => {game = newgame()});
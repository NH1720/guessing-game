/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

let newWinningNumber;

function generateWinningNumber() {
   newWinningNumber = Math.ceil(Math.random() * 100);
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


let game = {
    playersGuess: 1,
    previousGuesses: [1, 2, 3, 4, 5], 
    winningNumber: generateWinningNumber(),
    difference: function (playersGuess, winningNumber) {
        return Math.abs(playersGuess - winningNumber);
    },
    isLower: function(playersGuess, winningNumber) {
        if (playersGuess < winningNumber) {
            return true; 
        } else {
            return false;
        }
    },
    playersGuessSubmission: function(number) {
        this.playersGuess = number;
        if(this.playersGuess > 100) {
            return "This is not a vaild guess."
        } else if(this.playersGuess <= 0) {
            return "This is not a valid guess."
        } else if(!typeof number === "number") {
            return "This is not a valid guess."
        }
       return checkGuess();
    },
    checkGuess: function() {
        if (this.playersGuess === this.winningNumber) {
            return "You Win!"
        } 

    }

};

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

            this.playersGuess = number;

            
           return checkGuess();
        },
        checkGuess: function() {
            if (this.playersGuess > 100 || this.playersGuess <= 0 || typeof(number) !== "number") {
                return "This is not a vaild guess.";


            } else if (this.pastGuesses.includes(this.playersGuess)){
                return "You have already guessed that number.";
            } else if (this.playersGuess === this.winningNumber) {
                return "You Win!"
            } else {
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
                
        }
    };
  };
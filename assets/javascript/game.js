// Creating an array to store the soccer players' names
var words = ["HAZARD", "ROONEY", "KANE", "POGBA", "BECKHAM", "LAMPARD", "GERRARD", "DROGBA", "HENRY", "AGUERO", "SHEARER", "RONALDO", "SUAREZ", "SILVA", "BERGKAMP", "TERRY", "CECH", "FERDINAND", "VIEIRA", "GIGGS"];

//Creating an array of letters for guesses
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


//Creating more variables to be used later (and an object for all html entered via js)
var randomWord;
var wins = 0;
var guessesLeft = 12;
var underscoreWord = [];
var guessedLetters = [];
var guessedAgain = [];

var html = {
	winCount: document.getElementById("win-count"),
	currentWord: document.getElementById("word"),
	guessesRemaining: document.getElementById("guesses-remaining"),
	lettersGuessed: document.getElementById("letters-guessed"),
}

//Setting the function to get a random word and use the word length for underscores
function getRandomWord() {
	randomWord = words[Math.floor(Math.random() * words.length)];
};

//Starting the game
function begin() {
	getRandomWord();

	//replacing the letters with underscores
	for (var i = 0; i < randomWord.length; i++) {
		underscoreWord[i] = "_";
	}

	//html changes at beginning of the game
	html.winCount.innerHTML = wins;
	html.currentWord.innerHTML = underscoreWord.join(" ");
	html.guessesRemaining.innerHTML = 12;
	html.lettersGuessed.innerHTML = " ";
};

//Winning the game and resetting values to pre-game values
function winner(){
	if (underscoreWord.indexOf("_") === -1) {
		wins++;
		underscoreWord = [];
		guessedLetters = [];
		guessedAgain = [];
		guessesLeft = 12;
		begin();
	};
};

//Losing the game and resetting values to pre-game values
//Loser function works at times and does not work at other times...I am not sure why
function loser(){
	if (guessesLeft === 0) {
		underscoreWord = [];
		guessedLetters = [];
		guessedAgain = [];
		guessesLeft = 12;
		begin();
	};
};

//User events such as beginning the game and guessing letters
document.onkeyup = function(event) {
	if (event.keyCode === 13) {
		begin();

		document.onkeyup = function(event) {
			//Converting guesses to capital letters which match the letters array
			var userGuess = event.key.toUpperCase();
			if (letters.indexOf(userGuess) === -1) {
				alert ("Choose a letter.");
			}

			//For when the user guesses a wrong letter than has not been guessed before
			else if (randomWord.indexOf(userGuess) === -1 && (guessedAgain.indexOf(userGuess) === -1)) {
				guessesLeft--;
				guessedLetters.push(userGuess);
				guessedAgain.push(userGuess);
				html.lettersGuessed.innerHTML = guessedLetters.join(" ");
				html.guessesRemaining.innerHTML = guessesLeft;
			};

			//Replacing underscores with userGuess if the guess is correct and has not been guessed before
			if ((randomWord.indexOf(userGuess) > -1) && (guessedAgain.indexOf(userGuess) === -1)) {
				guessedAgain.push(userGuess);
				for (var j = 0; j < randomWord.length; j++) {
					if (randomWord[j] === userGuess) {
						underscoreWord[j] = userGuess;
					};
				}

				html.currentWord.innerHTML = underscoreWord.join("");


				//Running the won and lost functions
				loser();
				winner();
			};
		};
	};
};
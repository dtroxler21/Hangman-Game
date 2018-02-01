// Creating an array to store the soccer players' names
var words = ["HAZARD", "ROONEY", "KANE", "POGBA", "BECKHAM", "LAMPARD", "GERRARD", "DROGBA", "HENRY", "AGUERO", "SHEARER", "RONALDO", "SUAREZ", "SILVA", "BERGKAMP", "TERRY", "CECH", "FERDINAND", "VIEIRA", "GIGGS"];

//Creating an array of letters for guesses
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


//Creating more variables to be used later (and an object for all html entered via js)
var randomWord;
var wins = document.getElementById("win-count");
var guessesLeft = document.getElementById("guesses-remaining");
var underscoreWord = [];
var guessedLetters = [];
var guessedAgain = [];

var html = {
	currentWord: document.getElementById("word"),
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

	//html change at beginning of the game
	html.currentWord.innerHTML = underscoreWord.join(" ");
};

//Winning the game and resetting values to pre-game values
function winner() {
	if (underscoreWord.indexOf("_") === -1) {
		wins++;
		underscoreWord = [];
		guessesLeft = 12;
		guessedLetters = [];
		guessedAgain = [];
		begin();
	};
};

//Losing the game and resetting values to pre-game values
function loser() {
	if (guessesLeft === 0) {
		underscoreWord = [];
		guessesLeft = 12;
		guessedLetters = [];
		guessedAgain = [];
		begin();
	};
};

//User events such as beginning the game and guessing letters
document.addEventListener('keypress', (event) => {
	begin();
	var userGuess = event.key.toUpperCase();
	if (randomWord.indexOf(userGuess) === -1 && (guessedAgain.indexOf(userGuess) === -1)) {
		guessedLetters.push(userGuess);
		guessedAgain.push(userGuess);
		html.lettersGuessed.innerHTML = guessedLetters.join(" ");
		guessesLeft--;
	};

	if ((randomWord.indexOf(userGuess) > -1) && (guessedAgain.indexOf(userGuess) === -1)) {
		guessedAgain.push(userGuess);
		for (var j = 0; j < randomWord.length; j++) {
			if (randomWord[j] === userGuess) {
				underscoreWord[j] = userGuess;
			};
		}

		html.currentWord.innerHTML = underscoreWord.join("");
	};
});


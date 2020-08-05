/* Javascript of the Memory Game */
/* Global Variables */
// Array of Fish source name
const fishArray = ["bull_trout", "california_golden_trout", "chinook_salmon", "chum_salmon","coastal_cutthroat_trout", "coastal_rainbow_trout", 
	 "coho_salmon", "eagle_lake_rainbow_trout", "goose_lake_redband_trout", "kern_river_rainbow_trout", "lahontan_cutthroat_trout", "pink_salmon"];

// Array of the chosen fish source names (Pulled from fishArray through pickCards())
var chosenCards = [];
// Array of the actual cards displayed (Pulled from HTML after added)
var cardArray = [];

// Boolean to enable count two clicks
var cardClicked = false;
// Boolean to not allow any clicks when two cards are flipped over
var twoAreFlipped = false;

// Used to tempararily store the card clicked
var firstCard;
var secondCard;

// Counter Variables
var numberOfFlips = 0;

/* Setting Up Game through innerHTML */
window.onload = restart();
// Restart & Start
function restart(){
	chosenCards = [];
	pickCards();

	// Edit innerHTML to add in the cards
	var result = "";
	for(let i = 0; i < chosenCards.length; i++){
		result += 
		"<div class='card'; id='"+chosenCards[i]+"'><img class='front' src='pictures/fish/"+chosenCards[i]+".png' alt='"+chosenCards[i]+"'><img class='back' src='pictures/logo.png' alt='Logo'></div>";
		result += 
		"<div class='card'; id='"+chosenCards[i]+"'><img class='front' src='pictures/fish/"+chosenCards[i]+".png' alt='"+chosenCards[i]+"'><img class='back' src='pictures/logo.png' alt='Logo'></div>";
	}

	document.getElementsByClassName("game")[0].innerHTML = result;
	cardArray = document.querySelectorAll(".card");

	shuffleCards();

	// Attach EventListener to wait for clicks
	for(let i = 0; i < cardArray.length; i++){
		cardArray[i].addEventListener("click", flipOverCard, false);
	}
};

// Pick specific number of cards from the array of possible
function pickCards(){
	while(chosenCards.length < 6){
		var randomIndex = Math.floor(Math.random() * fishArray.length);

		if(chosenCards.includes(fishArray[randomIndex]) == false){
			chosenCards.push(fishArray[randomIndex]);
		}
	}
}

// Shuffle the cards through FlexBox Order
function shuffleCards(){
	for(let i = 0; i < cardArray.length; i++){
		var randomIndex = Math.floor(Math.random() * cardArray.length);
		cardArray[i].style.order = randomIndex;
	}
};


/* Memory Game Script */
// Flip Sound
function playFlipSound(){
	let flipSound = new Audio("audio/flip_sound.mp3");
	flipSound.play();
	flipSound.volume = 1;
};

// Applause Sound
function playApplauseSound(){
	let applauseSound = new Audio("audio/applause_sound.mp3");
	applauseSound.play();
	applauseSound.volume = 1;
};

// Flipping Card Script
function flipOverCard(){
	if(twoAreFlipped == false && this != firstCard){
		this.classList.toggle("flip");
		playFlipSound();

		if(cardClicked == false){
			cardClicked = true;
			firstCard = this;
		}else if(cardClicked == true){
			twoAreFlipped = true;
			cardClicked = false;
			secondCard = this;
			checkIsSame();
		}
	}
};

// Checks Match
function checkIsSame(){
	if(firstCard.id == secondCard.id){
		setTimeout(matchFound, 300);
	}else {
		setTimeout(automaticFlipOverCard, 700);
	}
};

// 
function matchFound(){
	playApplauseSound();
	// firstCard.style.border= "thick solid black";
	// secondCard.style.border = "thick solid black";
	firstCard.removeEventListener("click", flipOverCard, false);
	secondCard.removeEventListener("click", flipOverCard, false);
	numberOfFlips++;

	firstCard = null;
	secondCard = null;
	twoAreFlipped = false;

	if(numberOfFlips == chosenCards.length){
		setTimeout(endGame, 5000);
	}
};

// Automatic Flip Back
function automaticFlipOverCard(){
	firstCard.classList.toggle("flip");
	secondCard.classList.toggle("flip");

	firstCard = null;
	secondCard = null;
	twoAreFlipped = false;
};

function endGame(){
	chosenCards = [];
	cardArray = [];
	cardClicked = false;
	twoAreFlipped = false;
	firstCard = null;
	secondCard = null;
	numberOfFlips = 0;
	document.getElementsByClassName("game")[0].innerHTML = "";

	restart();
};


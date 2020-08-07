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
var cardToDisplay;

// Counter Variables
var numberOfFlips = 0;

// Modal Variables
var modal = document.getElementsByClassName("modalBackground")[0];
var modalX = document.getElementsByClassName("modalX")[0];

/* Setting Up Game through innerHTML */
window.onload = restart();
window.onload = setupModal();
window.onload = welcomeModal();

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


/* Sounds */
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

/* Memory Game Script */
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
		setTimeout(matchFound, 200);
	}else {
		setTimeout(automaticFlipOverCard, 700);
	}
};

// 
function matchFound(){
	cardToDisplay = firstCard.id;
	playApplauseSound();
	setTimeout(matchModal, 300);

	firstCard.removeEventListener("click", flipOverCard, false);
	secondCard.removeEventListener("click", flipOverCard, false);
	numberOfFlips++;

	firstCard = null;
	secondCard = null;
	twoAreFlipped = false;

	if(numberOfFlips == chosenCards.length){
		setTimeout(winModal, 700);
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
	cardToDisplay = null;
	numberOfFlips = 0;
	document.getElementsByClassName("game")[0].innerHTML = "";

	restart();
};

/* Modal Script */
function setupModal() {
	modalX.addEventListener("click", closeModal, false);
	window.addEventListener("click", 
		function(event) { 
			if(event.target == modal){
				closeModal();
			}
		}, false);
};

function openModal() {
	modal.style.display = "block";
};

function closeModal() {
	modal.style.display = "none";
	document.getElementsByClassName("modalText")[0].innerHTML = "";
};

function welcomeModal() {
	var result = "";
	result += 
	"<p> Welcome to the fin-tastic Memory Game for native fish in California! </p> <br> <p> There are currently only 12 different kinds of salmon, trout, steelhead swimming around waiting to be matched. </p> <br> <p> What are you waiting for? Don't leave the fish to salmon-else! Click the X on the top right to start the game. </p> <br><hr><br> <p> Here are all the possible fish in the river right now! </p> <br>";

	for(let i = 0; i < fishArray.length; i++){
		result +=
		"<div class='modalCardContainer'> <figure class='modalCard' style='width: 5.7rem; height: 8rem;'> <img style='width: 5.7rem; height: 8rem;' src='pictures/fish/"+fishArray[i]+".png' alt='"+fishArray[i]+"'> </figure> <figcaption> Fish </figcaption> </div>";

	}

	document.getElementsByClassName("modalText")[0].innerHTML = result;
	setTimeout(openModal, 300);
};

function matchModal() {
	var result = "";
	result += 
	"<p> You reeled in a match! </p> <br> <p> Let's check out what fish it is! </p> <br> <p> Click the X on the top right to continue the game. </p> <br><hr><br> <p> You caught a FISH </p> <br>";

	result +=
	"<div class='modalCardContainer'> <figure class='modalCard'> <img src='pictures/fish/"+cardToDisplay+".png' alt='"+cardToDisplay+"'> </figure> <figcaption  style='font-size: 1.4rem;'> FISH </figcaption> </div>";


	document.getElementsByClassName("modalText")[0].innerHTML = result;
	setTimeout(openModal, 300);
}

function winModal() {
	var result = "";
	result += 
	"<p> You did it! </p> <br> <p> Thank you for playing Caltrout Memory Game </p> <br> <p> If you want to play again, click the X on the top right to restart the game. </p> <br><hr><br> <p> Here's a recap of the fish you just caught! </p> <br>";

	for(let i = 0; i < chosenCards.length; i++){
		result +=
		"<div class='modalCardContainer'> <figure class='modalCard' style='width: 5.7rem; height: 8rem;'> <img style='width: 5.7rem; height: 8rem;' src='pictures/fish/"+chosenCards[i]+".png' alt='"+chosenCards[i]+"'> </figure> <figcaption> Fish </figcaption> </div>";

	}

	document.getElementsByClassName("modalText")[0].innerHTML = result;
	setTimeout(openModal, 300);

	endGame();
};
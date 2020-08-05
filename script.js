/* Javascript of the Memory Game */
/* Global Variables */
// Source Name of Fish
const fishArray = ["bull_trout", "california_golden_trout", "chinook_salmon", "chum_salmon","coastal_cutthroat_trout", "coastal_rainbow_trout", 
	 "coho_salmon", "eagle_lake_rainbow_trout", "goose_lake_redband_trout", "kern_river_rainbow_trout", "lahontan_cutthroat_trout", "pink_salmon"];

var chosenCards = [];

// Actual Cards Displayed
var cardArray = [];
var cardClicked = false;
var firstCard;
var secondCard;


window.onload = restart();
/* Setting Up Game through innerHTML */
// Restart & Start
function restart(){
	chosenCards = [];
	pick6Cards();
	shuffleCards();

	var result = "";
	for(let i = 0; i < chosenCards.length; i++){
		result += 
		"<div class='card'><img class='front' src='pictures/fish/"+chosenCards[i]+".png' alt='"+chosenCards[i]+"'><img class='back' src='pictures/logo.png' alt='Logo'></div>";
		result += 
		"<div class='card'><img class='front' src='pictures/fish/"+chosenCards[i]+".png' alt='"+chosenCards[i]+"'><img class='back' src='pictures/logo.png' alt='Logo'></div>";
	}

	document.getElementsByClassName("game")[0].innerHTML = result;
};

function pick6Cards(){
	while(chosenCards.length < 6){
		var randomIndex = Math.floor(Math.random() * fishArray.length);

		if(chosenCards.includes(fishArray[randomIndex]) == false){
			chosenCards.push(fishArray[randomIndex]);
		}
	}
	cardArray = document.querySelectorAll(".card");
}

function shuffleCards(){
	for(let i = 0; i < cardArray.length; i++){
		var randomIndex = Math.floor(Math.random() * cardArray.length);
		cardArray[i].style.order = randomIndex;
		console.log(cardArray[i]);
	}
};


/* Memory Game Script */
// Flip Sound
function playFlipSound(){
	let flipSound = new Audio("audio/flip_sound.mp3");
	flipSound.play();
	flipSound.volume = 1;
};

// Flipping Card Script
function flipOverCard(){
	this.classList.toggle("flip");
	playFlipSound();

	// if(cardClicked == false){
	// 	cardClicked = true;
	// 	firstCard = this;
	// 	console.log(firstCard.id);
	// }else if(cardClicked == true){
	// 	cardClicked = false;
	// 	secondCard = this;
	// 	console.log(secondCard.id);
	// 	isSame();
	// }
};

// function isSame(){
// 	if(firstCard.id == secondCard.id){
// 		console.log("Match");
// 		firstCard = null;
// 		secondCard = null;
// 	}
// };

// Attach EventListener to wait for clicks
for(let i = 0; i < cardArray.length; i++){
	cardArray[i].addEventListener("click", flipOverCard, false);
}

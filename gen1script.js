/* Javascript of the Memory Game */
/* Global Variables */
const cardArr = document.querySelectorAll(".card");
var cardClicked = false;
var firstCard;
var secondCard;

// Flipping Card Script
function playFlipSound(){
	let flipSound = new Audio("audio/flip_sound.mp3");
	flipSound.play();
	flipSound.volume = 1;
};

function flipOverCard(){
	this.classList.toggle("flip");
	playFlipSound();

	if(cardClicked == false){
		cardClicked = true;
		firstCard = this;
		console.log(firstCard.id);
	}else if(cardClicked == true){
		cardClicked = false;
		secondCard = this;
		console.log(secondCard.id);
		isSame();
	}
};

function isSame(){
	if(firstCard.id == secondCard.id){
		console.log("Match");
		firstCard = null;
		secondCard = null;
	}
};

for(let i = 0; i < cardArr.length; i++){
	cardArr[i].addEventListener("click", flipOverCard, false);
}


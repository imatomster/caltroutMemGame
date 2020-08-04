/* Javascript of the Memory Game */
/* Global Variables */
var cardArr = document.querySelectorAll(".card");
var cardClicked = false;
var firstCard;
var secondCard;

// Flipping Card Script
function playFlipSound(){
	let flipSound = new Audio("audio/flip_sound.mp3");
	flipSound.play();
	flipSound.volume = 0.2;
};

function flipOverCard(){
	this.classList.toggle("flip");
	playFlipSound();

	if(cardClicked == false){
		cardClicked = true;
		firstCard = this;
		return ;
	}

	if(cardClicked == true){
		secondCard = this;
		isSame();
	}
};

function isSame(){
	// if(document.getElementById("myImg").alt)
}

for(let i = 0; i < cardArr.length; i++){
	cardArr[i].addEventListener("click", flipOverCard, false);
}


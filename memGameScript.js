/* Javascript of the Memory Game */
/* Global Variables */
var cardArr = [];
cardArr = document.querySelectorAll(".card");


// Flipping Card Script
window.onload = function(){
	for(var i = 0; i < cardArr.length; i++){
		cardArr[i].addEventListener("click", 
			function(){
				this.classList.toggle("flipCard");
			}
		, false);
	}
};
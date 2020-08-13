/* Javascript for all Fish Data */
var fishArray = [
	{name: "bull_trout", display: "", website: "", threat: "", description: ""},
	{name: "california_golden_trout", display: "", website: "", threat: "", description: ""},
	{name: "chinook_salmon", display: "", website: "", threat: "", description: ""},
	{name: "chum_salmon", display: "", website: "", threat: "", description: ""},
	{name: "coastal_cutthroat_trout", display: "", website: "", threat: "", description: ""},
	{name: "coastal_rainbow_trout", display: "", website: "", threat: "", description: ""},
	{name: "coho_salmon", display: "", website: "", threat: "", description: ""},
	{name: "eagle_lake_rainbow_trout", display: "", website: "", threat: "", description: ""},
	{name: "goose_lake_redband_trout", display: "", website: "", threat: "", description: ""},
	{name: "kern_river_rainbow_trout", display: "", website: "", threat: "", description: ""},
	{name: "lahontan_cutthroat_trout", display: "", website: "", threat: "", description: ""},
	{name: "pink_salmon", display: "", website: "", threat: "", description: ""}
];

window.onload = setUpFishArray();

// Load up game
function setUpFishArray() {
	fillDisplay();
	fillWebsite();
};

function fillDisplay() {
	var spaceStr = "";
	var upperStr = "";
	for(let i = 0; i < fishArray.length; i++){
		spaceStr = fishArray[i].name.replace(/_/g, " ");
		upperStr = spaceStr.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
		fishArray[i].display = upperStr;
	}
};

function fillWebsite() {
	var newStr = "";
	for(let i = 0; i < fishArray.length; i++){
		newStr = fishArray[i].name.replace(/_/g, "-");
		fishArray[i].website = newStr;
	}
};
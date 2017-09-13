var ans = [
	{
	answer:"zelda", 
	hint:"M'lady"},
	{
	answer:"hyrule",
	hint:"M'land"},
	{
	answer:"ganon",
	hint:"M'enemy"},
	{
	answer:"rupee",
	hint:"M'currency"},
	{
	answer:"epona",
	hint:"M'horse"},
	{
	answer:"sword",
	hint:"M'weapon"},
	{
	answer:"heart",
	hint:"M'life"},
	{
	answer:"zora",
	hint:"M'fish people"},
	{
	answer:"goron",
	hint:"M'fire people"},
	{
	answer:"gerudo",
	hint:"M'people"},
	{
	answer:"rito",
	hint:"M'birds"},
	{
	answer:"arrow",
	hint:"M'other weapon"},
	{
	answer:"shield",
	hint:"M'defense"},
	{
	answer:"korok",
	hint:"M'trees"},
	{
	answer:"hylia",
	hint:"M'lake"},
	{
	answer:"kakariko",
	hint:"M'village"},
	{
	answer:"castle",
	hint:"M'lady's prison sometimes"},
	{
	answer:"forest",
	hint:"M'lose myself there"},
	{
	answer:"miyamoto",
	hint:"M'creator"},
	{
	answer:"navi",
	hint:"M'help"},
	{
	answer:"stalfos",
	hint:"M'enemy's skeleton"},
	{
	answer:"bokoblin",
	hint:"M'enemy small pig"},
	{
	answer:"lizalfos",
	hint:"M'enemy lizard"},
	{
	answer:"chuchu",
	hint:"M'enemy jelly"},
	{
	answer:"moblin",
	hint:"M'enemy big pig thing"},
	{
	answer:"guardian",
	hint:"M'enemy shoots lasers at me and hurts real bad"},
	{
	answer:"lynel",
	hint:"M'enemy centaur-like"},
	];

//Holds the keyboard guess from the user
var guess = "";

//stores the right or wrong guesses from the user
var rightGuess;
var wrongGuess;

var randomNumber;

//stores the correct answer in the form of an array of letters
var letters;

//Used to control the checkLoss function - used this to allow a loss to occur but the user hasn't hit 'enter' to reset the game
//Helps to prevent user from accidentally causing additional win or loss before resetting
var loss = 0;

//Used to control the checkWin function - used this to allow a win to occur but the user hasn't hit 'enter' to reset the game
//Helps to prevent user from accidentally causing additional win or loss before resetting
var winny = [];
var losing = false;

//Used to create array of null with a length of letters array. This is used to create the underscores at the beginning of the game
//And is used to show the answers as the user guesses them.  
var showingAns;
var gameOver = false;

var letterDiv = document.getElementById("letters");
var naviDiv = document.getElementById("navi");
var hintDiv = document.getElementById("hint");
var wrongDiv = document.getElementById("wrong");
var messageDiv = document.getElementById("message");
var lifeDiv = document.getElementById("life");
var itemDiv = document.getElementById("item");

//Set start conditions
function startGame(){
	addLife(3);
	gameReset();
	fillLetters(showingAns);
}

//Adds life div based on parameter passed to it, plays sound while doing so
function addLife(num) {
	var audio = new Audio('assets/audio/heart.wav');
	for (var i = 0; i< num; i++){
		var newDiv = document.createElement("span");
		newDiv.classList.add("fadesin");
		audio.play();
		newDiv.innerHTML ="<img src = 'assets/images/heart.png' class = 'img-responsive img-heart'>";
		lifeDiv.appendChild(newDiv);
	}
	//Checks how many hearts there are, if there are greater than 9, will set the win entire game condition
	if (lifeDiv.children.length>9){
		var audio2 = new Audio('assets/audio/item.wav')
		audio2.play();
		letterDiv.classList.add("fadesout");
		messageDiv.classList.add("fadesout");
		document.getElementById("wrong-text").classList.add("fadesout");
		itemDiv.classList.add("fadesin");
		itemDiv.innerHTML = "<img src ='assets/images/chest.png' id='img-item'>";
		itemDiv.onclick = function() {masterSword()};
	}
}

//shows the master sword item as a result of win condition
function masterSword(){
	messageDiv.innerHTML = "<h2>IT'S DANGEROUS TO GO ALONE! TAKE THIS.</h2> <p> You have obtained the Master Sword. You must now go forth and face Ganon.</p> <p>Press any button to play again</p>";
	messageDiv.classList.remove("fadesout");
	messageDiv.classList.add("fadesin");
	itemDiv.innerHTML = "<img src = 'assets/images/mastersword.png' id = 'img-sword'>";
	gameOver = true;
}

//Removes last added life div, plays sound while doing so
function loseLife(){
	lifeDiv.lastChild.classList.add("heartfadesout");
	lifeDiv.lastChild.style.opacity = '0';
	setTimeout(function(){lifeDiv.removeChild(lifeDiv.lastChild);}, 1000);
	var audio = new Audio('assets/audio/lowhealth.wav');
	audio.play();
}

//Helper Navi pops up when life is below 3 and goes away when life is greater than or equal to 3
function navi(){
	var audio = new Audio('assets/audio/navihey.wav');
	if (lifeDiv.children.length<3){
		//fades in the navi image 
		naviDiv.classList.remove("fadesout");
		naviDiv.classList.add("fadesin");
		naviDiv.innerHTML = "<img src ='assets/images/navi.png' id ='img-navi'>";
		audio.play();
		hintDiv.classList.remove("fadesout");
		hintDiv.classList.add("fadesin");
		hintDiv.innerHTML = "<br><br>You suck, so here is a hint: <p>" + ans[randomNumber].hint + "</p>";

	}
	//fades out the navi image
	if (lifeDiv.children.length>=3){
		naviDiv.classList.add("fadesout");
		naviDiv.classList.remove("fadesin");
		hintDiv.classList.add("fadesout");
		hintDiv.classList.remove("fadesin");
		//delay the start of clearing naviDiv so that it can fade out. Clearing it out for formatting
		setTimeout(function() {
			naviDiv.innerHTML = " ";
		}, 2000);
	}

}

function gameReset(){
	randomNumber = 0 + Math.floor(Math.random() * (ans.length));
	rightGuess = [];
	letters = Array.from(ans[randomNumber].answer.toLowerCase());
	showingAns = Array.apply(null, Array(letters.length)).map(function () {});
	messageDiv.innerHTML = " ";
	wrongGuess = [];
	loss = 0;
	losing = false;
	winny = [];
	showWrong(wrongGuess);
	fillLetters(showingAns);
}

//fills in the underscores or letters		
function fillLetters(ans) {
	letterDiv.innerHTML = "";
	for (var i = 0; i< ans.length; i++){
		var newDiv = document.createElement("span");
		newDiv.setAttribute("class", "spacing");
		if (typeof ans[i] == "undefined"){
			newDiv.innerHTML += "_";
		}
		else {
			newDiv.innerHTML += ans[i] + " ";
		}
		letterDiv.appendChild(newDiv);
	}
}

//checks if the user has met the lose conditions (8 incorrect guesses)
function checkLoss(num){
	if (num > 6) {
		//loss++;
		loseLife();
		setTimeout(function() {
			if(lifeDiv.children.length > 0){
				messageDiv.innerHTML ="<h1>YOU LOSE!!!</h1> <p>Press Enter to play again!</p>";
			}
			else{
			messageDiv.innerHTML = "<h1>You are the worst. RESET!</h1>";
			}
			console.log("Number of hearts: " + lifeDiv.children.length);
		}, 1000);
		
		return true;
	}
	else{
		return false;
	}
}

//checks if the user guessed all of the letters correctly
function checkWin(arr1, arr2) {
	if (arr1.length == arr2.length){
		winny = [];
		for (var i = 0; i < arr2.length; i++){
			if (arr2.indexOf(arr1[i])>-1){
				winny[i] = 'y';
			}
		}
		if (winny.length == arr2.length){
			rightGuess = [];
			addLife(1);
			console.log("Number of hearts: " + lifeDiv.children.length);
			messageDiv.innerHTML ="<h1>YOU WIN!!!</h1> <p>Press Enter to play again!</p>";
			return true;
		}
		else{
			return false;
		}
	}
	else {
		return false;
	}

}

function showWrong(arr){
	wrongDiv.innerHTML = arr;
} 

document.onkeyup = function(event) {
	
	guess = event.key.toLowerCase();
	var keyCodes = event.keyCode
	//used as a check to ensure loss condition
	var right = true;

	if (keyCodes >=48 && keyCodes <=90){
		messageDiv.innerHTML = " ";
		//makes sure that only enters if the user is playing and not in a win or loss condition
		if (ans[randomNumber].answer.toLowerCase().indexOf(guess) > -1 && rightGuess.length < letters.length && winny.length != letters.length && !losing){
			if (rightGuess.indexOf(guess)==-1){
				for (var i = 0; i < letters.length; i++) {
					if (guess == letters[i]) {
						showingAns[i] = letters[i];
						rightGuess.push(letters[i]);
					}
				}
				fillLetters(showingAns);
				checkWin(rightGuess, letters);
			}
			//if the user is playing but already guessed the letter
			else {
				messageDiv.innerHTML = "<h3>You already guessed that!</h3>";
			}
		}
		//if the user is playing but guesses the wrong letter again. ensure the user is not in a loss condition
		else if (wrongGuess.indexOf(" " + guess) > -1 && !losing) {
				messageDiv.innerHTML = "<h3>You already guessed that!</h3>";
		}
		else {
			//if the wrong letter then check if still playing; if so increase the wrong letter counter and show the wrong guess to user
			if (loss <= 7 && winny.length != letters.length){
				loss++;
				wrongGuess.push(" " + guess);
				showWrong(wrongGuess);
				right = false;
			}
		}
	}
	else {
		//if the user enters anything other than a letter or a number
		if (!losing && winny.length != letters.length) {
			messageDiv.innerHTML = "<h3>Please enter a letter or number.</h3>";
		}
	}
	
	//used to ensure that either a win or loss condition have been met. If so, the game will only reset if 'Enter' is pressed
	if (winny.length == letters.length || losing){
		if (guess =="enter") {
			gameReset();
			navi();
		}
	}
	//checks the loss conditions
	if (right == false && loss > 7){
		losing = checkLoss(loss);
	}
	//reloads the page when the entire game is won
	if(gameOver){
		location.reload();
	}
	//reloads the page when the entire game is lost
	if(lifeDiv.children.length <1){
		location.reload();
	}
	console.log("right guess: " + rightGuess + " " + "letters: " + letters);
}
startGame();

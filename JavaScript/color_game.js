var numSquares = 6;

var colors = generateRandomColors(numSquares);
var pickedColor = pickColor();


var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");

var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");



easyBtn.addEventListener("click",function(){
	easyBtn.classList.toggle("selected");
	hardBtn.classList.toggle("selected");

	var numSquares = 3;

	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	for(var i=0;i<6;i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		}
		else{
			squares[i].style.display = "none";
		}
	}
});

hardBtn.addEventListener("click",function(){
	easyBtn.classList.toggle("selected");
	hardBtn.classList.toggle("selected");

	var numSquares = 6;

	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	for(var i=0;i<6;i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
});


resetButton.addEventListener("click",function(){

	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}

	h1.style.backgroundColor = "#232323";
	resetButton.textContent = "NEW COLORS"


});


colorDisplay.textContent = pickedColor;

for(var i = 0; i < squares.length; i++){

	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click",function(){
		var grabbedColor = this.style.backgroundColor

		if(grabbedColor !== pickedColor){
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again!";
		}
		else{
			messageDisplay.textContent = "Correct!";
			changeColors();
			h1.style.backgroundColor = pickedColor;
			resetButton.textContent = "PLAY AGAIN?"
		}
	});	
}

function changeColors(){

	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = pickedColor;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length)

	return colors[random];
}

function generateRandomColors(num){

	var arr = [];
	for(var i = 0; i < num; i++ ){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);

	var colorString = "rgb(" + red + ", " + green + ", " + blue +  ")";
	return colorString;

}
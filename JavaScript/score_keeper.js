var score_one = 0;
var score_two = 0;
var final_score = 3;

var gameOver = false;


var scoring = document.querySelector("h1");
var playing = document.querySelector("h3");

var one = document.querySelector("#one");
var two = document.querySelector("#two");
var reset = document.querySelector("#reset");
var numInput = document.querySelector("input");

var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");


one.addEventListener("click", function(){

	if(gameOver === false){
		score_one++;
		if(score_one === final_score){
			gameOver = true;
			p1Display.style.color = "green";
		}
		p1Display.textContent = score_one;
	}
})

two.addEventListener("click", function(){

	if(gameOver === false){
		score_two++;
		if(score_two === final_score){
			gameOver = true;
			p2Display.style.color = "green";
		}
		p2Display.textContent = score_two;
	}
})

reset.addEventListener("click",resetAll);

function resetAll(){
	score_one = 0;
	score_two = 0;

	p1Display.textContent = 0;
	p2Display.textContent = 0;

	p1Display.style.color = "black";
	p2Display.style.color = "black";

	gameOver = false;
}
numInput.addEventListener("change",function(){
	var input = this.value;
	final_score = parseInt(input,10);
	playing.textContent = "Playing to: " + input;

	resetAll();
})





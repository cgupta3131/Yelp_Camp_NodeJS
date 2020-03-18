var express = require('express');
var app = express();

app.get("/",function(req,res){
	res.send("Hi There!");
});

app.get("/bye",function(req,res){
	res.send("Will meet soon!!");
});

app.get("/chirag",function(req,res){
	res.send("Chirag loves Disha!!!");
});

app.get("/r/:subredditName", function(req,res){
	var subreddit = req.params.subredditName;
	res.send("Welcome to the " + subreddit);
});

app.get("/repeat/:message/:count", function(req,res){
	var msg = req.params.message;
	var cnt = req.params.count;

	var finalString = "";
	for(var i=0;i<cnt;i++){
		finalString += msg;
	}

	res.send(finalString);
});

app.listen(3000,function(){
	console.log("Server started at port 3000");
});


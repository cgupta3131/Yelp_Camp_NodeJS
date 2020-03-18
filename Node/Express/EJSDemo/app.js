var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("home");
});

app.get("/chirag/:thing", function(req,res){
    var thing = req.params.thing;
    res.render("thing", {thingVar: thing});
});

app.get("/posts", function(req,res){
    var posts = [
        {title: "Cricket", author:"Virat Kohli"},
        {title: "Football", author:"Lionel Messi"},
        {title: "Tennis", author:"Roger Federer"}
    ]

    res.render("posts", {posts:posts});
});



app.listen(3000,function(){
	console.log("Server started at port 3000");
});
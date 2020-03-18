var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var friends = ["Disha", "Lavish", "Kartik", "Vakul", "Harit"]

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("home");
});

app.get("/friends", function(req,res){
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req,res){
    console.log(req.body);
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
})




app.listen(3000,function(){
	console.log("Server started at port 3000");
});
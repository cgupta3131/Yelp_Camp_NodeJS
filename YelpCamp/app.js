var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    var campgrounds = [
        {name:"Chirag's Camp",image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d2b7ddd9249cc5f_340.jpg"},
        {name:"Disha's Camp",image:"https://pixabay.com/get/57e8d34b4c50a814f6da8c7dda793f7f1636dfe2564c704c7d2b7ddd9249cc5f_340.jpg"},
        {name:"Lavish's Camp",image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2b7ddd9249cc5f_340.jpg"}
    ]
    res.render("landing");
});


app.listen(3000,function(){
    console.log("Server started at port 3000");
});


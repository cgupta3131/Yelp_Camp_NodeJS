var express = require('express');
var app = express();
var bodyPareser = require('body-parser');

app.use(bodyPareser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("landing");
});

var campgrounds = [
    {name:"Chirag's Camp",image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d2b7ddd9249cc5f_340.jpg"},
    {name:"Disha's Camp",image:"https://pixabay.com/get/57e8d34b4c50a814f6da8c7dda793f7f1636dfe2564c704c7d2b7ddd9249cc5f_340.jpg"},
    {name:"Lavish's Camp",image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2b7ddd9249cc5f_340.jpg"}
]

app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;

    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});


app.listen(3000,function(){
    console.log("Server started at port 3000");
});


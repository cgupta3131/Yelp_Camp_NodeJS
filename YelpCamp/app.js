var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});	
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("landing");
});

//SCHEME SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String

});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
    name:"Chirag's Camp",
    image:"https://combo.staticflickr.com/ap/build/images/jobs/good-panda.jpg",
    description: "This is Chirag's Camp"
}, function(err,campground){
if(err){
        console.log("Something went wrong");
    }
    else{
        console.log("Campground added to the database");
        console.log(campground);
    }
});*/

var campgrounds = [
    {name:"Chirag's Camp", image:"https://c1.staticflickr.com/5/4471/23727254668_bb82678d67_z.jpg"},
    {name:"Disha's Camp", image:"https://combo.staticflickr.com/ap/build/images/jobs/good-panda.jpg"},
    {name:"Lavish's Camp", image:"https://live.staticflickr.com/65535/48441271856_af538f5568_b.jpg"}
]

//INDEX - show all campgrounds
app.get("/campgrounds",function(req,res){
    //Get all the campgrounds from database
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Some Error occured");
            console.log(err);
        }
        else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
});

//CREATe - add new campground to DB
app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    var newCampground = {name:name, image:image, description: desc};
    //Create a new campground and add to dataBase
    Campground.create(newCampground, function(err,campground){
    if(err){
            console.log("Something went wrong");
        }
        else{
            console.log("Campground added to the database");
            console.log(campground);
        res.redirect("/campgrounds");
        }
    });

});

//NEW - show form to create new campground
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

//SHOw - displays information about one campground
app.get("/campgrounds/:id",function(req,res){

    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log("foundCampground: " + foundCampground);
            //res.render("index", {campgrounds: foundCampground});
            res.render("show", {campground: foundCampground});
        }
    });
});


app.listen(3000,function(){
    console.log("Server started at port 3000");
});


var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/",function(req,res){
    //Get all the campgrounds from database
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Some Error occured");
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
});

//CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newCampground = {name:name, image:image, description: desc, author: author};

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
router.get("/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW - displays information about one campground
router.get("/:id",function(req,res){

    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log("foundCampground: " + foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
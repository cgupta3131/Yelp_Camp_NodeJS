var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var methodOverride = require('method-override');
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);
var middleware = require("../middleware/index");


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
router.post("/", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var cost = req.body.cost;
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var lat = req.body.lat;
    var long = req.body.long;

    var newCampground = {
        name:name, image:image, description: desc, author: author, cost: cost, lat: lat, long: long
    };

    //Create a new campground and add to dataBase
    Campground.create(newCampground, function(err,campground){
    if(err){
            console.log("Something went wrong");
        }
        else{
        res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW - displays information about one campground
router.get("/:id",function(req,res){

    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership ,function(req,res){

    Campground.findById(req.params.id, function(err,foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id); //redirects to show page
        }
    });
});

//DELETE ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership,  function(req,res){

    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds"); //redirects to show page
        }
    });
});

module.exports = router;
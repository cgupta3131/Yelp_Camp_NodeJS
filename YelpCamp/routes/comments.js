var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


router.get("/new", isLoggedIn,function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

router.post("/",  isLoggedIn ,function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{

            //create new comment
            Comment.create(req.body.comment, function(err,newComment){
                if(err){
                    console.log(err);
                } else{
                    //add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;

                    newComment.save();
                    
                    //conenct the newly created comment to the campground
                    foundCampground.comments.push(newComment);
                    foundCampground.save();

                    //redirect to the campground show page
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });

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

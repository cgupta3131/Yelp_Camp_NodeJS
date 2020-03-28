var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var methodOverride = require('method-override');
var middleware = require("../middleware/index");


router.get("/new", middleware.isLoggedIn,function(req,res){
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

router.post("/", middleware.isLoggedIn ,function(req,res){
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

                    req.flash("success", "Successfully added comment");
                    //redirect to the campground show page
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });

        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership,  function(req,res){

    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){    
            res.redirect("back");
        }
        else{
            Comment.findById(req.params.comment_id, function(err,foundComment){
                if(err){
                    res.redirect("back");
                }
                else{
                    res.render("comments/edit", {comment: foundComment, campground: foundCampground});
                }
            })
        }
    });
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership,  function(req,res){

    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id); //redirects to show page
        }
    });
});

//DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){

    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            req.flash("error", err.message);
            return res.redirect("back");
        }
        //deletes the comment from the Campground also
        Campground.findByIdAndUpdate(req.params.id, {$pull: {comments: req.params.comment_id}}, {new: true})
                .populate("comments").exec(function (err, campground) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }

            campground.save();
            
            req.flash("success", "Your comment was deleted successfully.");
            res.redirect("/campgrounds/" + req.params.id);
        });
    });
});

module.exports = router;

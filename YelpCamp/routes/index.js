var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require('passport');
var User = require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
});

//SHOW REGISTER FORM
router.get("/register",function(req,res){
    res.render("register");
});

//HANDLE SIGN UP
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,userCreated){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome to YelpCamp " + userCreated.username );
            res.redirect("/campgrounds");
        });
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req,res){
    res.render("login");
})

//HANDLING USER LOGIN
router.post("/login", passport.authenticate("local", 
    { //middleware
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){

        res.render("login");
});

//LOGOUT
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require("./models/user");

app.use(require("express-session")({
	secret: "Shinchu is cute",
	resave: false,
	saveUninitialized: false
}));

mongoose.connect("mongodb://localhost/auth_demo", {useNewUrlParser: true, useUnifiedTopology: true});	
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret", isLoggedIn,function(req,res){
    res.render("secret");
});

//SHOW SIGN UP FORM
app.get("/register", function(req,res){
	res.render("register");
})

//HANDLING USER SIGNUP
app.post("/register", function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err,userCreated){
		if(err){
			console.log(err);
			return res.render("/register");
		}

		passport.authenticate("local")(req,res,function(){
			res.redirect("/secret");
		});
	});
});


//SHOW LOGIN FORM
app.get("/login", function(req,res){
	res.render("login");
})

//HANDLING USER LOGIN
app.post("/login", passport.authenticate("local", { //middleware
	successRedirect: "/secret",
	failureRedirect: "/login"
}),function(req,res){
	res.render("login");
})




//LOGOUT
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect("/login");
}


app.listen(3000,function(){
    console.log("Server started at port 3000");
});
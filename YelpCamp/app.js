var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var seedDB = require("./seeds");
var methodOverride = require('method-override');
var flash = require('connect-flash');



//Route Files
var campgroundRoutes = require("./routes/campgrounds.js");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");
var reviewRoutes = require("./routes/reviews");


//seedDB();

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});	
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// ==========================================

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Shinchu is cute",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==========================================


//the below function would be called on every route as a middle ware!
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds",campgroundRoutes); //takes all routes defined in camgroundRoutes and appends /camgrounds
app.use("/campgrounds/:id/reviews", reviewRoutes);


app.listen(3000,function(){
    console.log("Server started at port 3000");
});


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');

mongoose.connect("mongodb://localhost/blog_app", {useNewUrlParser: true, useUnifiedTopology: true});	
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer()); //this line must be after body-parser 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));


var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES

app.get("/", function(req,res){
	res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs", function(req,res){
	Blog.find({},function(err,allBlogs){
        if(err){
            console.log("Some Error occured");
            console.log(err);
        }
        else{
            res.render("index", {blogs: allBlogs});
        }
    })
});

//NEW ROUTE
app.get("/blogs/new", function(req,res){
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req,res){

	req.body.blog.body = req.sanitize(req.body.blog.body);

	Blog.create(req.body.blog, function(err,campground){
    if(err){
    		res.render("new");
            console.log("Something went wrong");
        }
        else{
        	res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            console.log(err);
        }
        else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req,res){

	//using sanitization, no script tags would be evaluated, and would be removed from body of the blog
	//and hence only the HTML tags would be evaluated!
	req.body.blog.body = req.sanitize(req.body.blog.body);

	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
        }
        else{
        	console.log(req.body.blog);
            res.redirect("/blogs/" + req.params.id); //redirects to show page
        }
	});
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req,res){

	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs"); //redirects to show page
        }
	});
});


app.listen(3000,function(){
    console.log("Server started at port 3000");
});
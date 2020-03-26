var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true, useUnifiedTopology: true});	


var Post = require('./models/post');
var User = require('./models/user');


Post.create({
	title:"Good Boy",
	content:"Hawwww2"
},function(err,post){
	User.findOne({name:"Chirag"}, function(err,foundUser){
		if(err){
			console.log(err);
		}else{
			foundUser.posts.push(post);
			foundUser.save();
		}
	});
});


//Find user and then find all it's posts
/*
User.findOne({name:"Chirag"}).populate("posts").exec(function(err,user){
	console.log(user);
});*/

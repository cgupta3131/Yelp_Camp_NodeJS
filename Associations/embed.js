var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true, useUnifiedTopology: true});	

//POST - title,content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);

//USER - email,name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


/*var newUser = new User({
	email:"guptadisha411@gmail.com",
	name:"Disha Gupta"
});

newUser.posts.push({
	title: "HarryPotter",
	content: "Very Good Book"
});

newUser.save();*/

/*Post.create({
	title:"Football",
	content:"European Nations play this"
});*/


User.findOne({name:"Disha Gupta"}, function(err,user){
	if(err){
		console.log(err);
	} else{	
		user.posts.push({
			title:"Angels and Demon",
			content:"One of the best books by Dan Bron"
		})

		user.save();
	}
});
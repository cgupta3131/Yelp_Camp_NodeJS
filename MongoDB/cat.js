var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat",catSchema);

//adding a new cat to Database

/*var george = new Cat({
	name: "Chirag",
	age: 11,
	temperament: "sweet"
});

george.save(function(err,cat){
	if(err){
		console.log("Something went wrong");
	}
	else{
		console.log("Cat added to the database");
		console.log(cat);
	}
});*/

//Second method to create a Cat
Cat.create({
	name:"Disha",
	age: 20,
	temperament: "Nice Cat"
}, function(err,cat){
	if(err){
		console.log("Something went wrong");
	}
	else{
		console.log("Cat added to the database");
		console.log(cat);
	}
});

//retrieve all cats from the Database

Cat.find({},function(err,cats){
	if(err){
		console.log("Some Error occured");
		console.log(err);
	}
	else{
		console.log("All the cats..." + cats);
	}
})
var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("search");
})


app.get("/results", function(req,res){

    var searchKey = req.query.search;
    console.log(searchKey);
    var address = "http://www.omdbapi.com/?s=" + searchKey + "&apikey=thewdb";
    console.log(address);
    request(address, function(error,response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
            // res.send(results["Search"][0]);
        }
    });
});



app.listen(3000,function(){
    console.log("Server started at Port 3000");
})
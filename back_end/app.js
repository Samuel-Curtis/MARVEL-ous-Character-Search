require('dotenv').config()

const express = require('express');
const app = express();
app.use(express.static('../front_end'))

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Separate file containing all necessary marvel functions
const mf = require('./public/javascripts/marvel_functions.js');

// Load index page on startup
app.get("/", function(req, res) {
    res.sendFile('/index.html');
})

// Will be renamed to getByName
app.post("/doSomething", function(req, res) {
    var input = req.body.value;
    console.log("okay I'm doing something!", input)
    mf.findByName(input);
})

// Used for populating typeahead search feature
app.post("/getNameStartsWith", async function(req, res) {
    var name = req.body.value;

    console.log("Getting Name Starts With: ", name);
    let characterNames = await mf.getNameStartsWith(name);
    
    if(characterNames !== undefined) {
      console.log("Characters array in app.js: ", characterNames);
      res.json({characters: characterNames});
    }
})

// If request is not found, render this page
app.get("*", function (req, res) {
    // res render "We dont have that page in stock!"
  });

// Start the server on port 3000
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
  });
require('dotenv').config()

const express = require('express');
const app = express();
app.use(express.static('../front_end'))

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Separate file containing all necessary marvel functions.
const mf = require('./public/javascripts/marvel_functions.js');

// Load index page on startup.
app.get("/", function(req, res) {
    res.sendFile('/index.html');
})

// Used for populating page content.
app.post("/getCharacterInfo", async function(req, res) {
    var name = req.body.value;
    let character = await mf.findByName(name);
    let comicArr = await mf.getComicsByCharId(character.id)

    res.json({character: character, comics: comicArr});
})

// Used for populating typeahead search feature.
app.post("/getNameStartsWith", async function(req, res) {
    var name = req.body.value;

    let characterNames = await mf.getNameStartsWith(name);
    
    res.json({characters: characterNames});
})

// If for some reason the user tries to go to another page, redirect them to index.
app.get("*", function (req, res) {
    res.sendFile('/index.html');
  });


// Start the server on correct port. If no other port is specified then 3000 is used. 
const port = process.env.port || 3000;
app.listen(3000, function () {
    console.log("Server started! Listening on port: ", port);
});
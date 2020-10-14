require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.static('../front_end'))

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Load index page on startup
app.get("/", function(req, res) {
    res.sendFile('/index.html')
})

app.post("/doSomething", function(req, res) {
    var input = req.body.value;
    console.log("okay I'm doing something!", input)
})
// If request is not found, render this page
app.get("*", function (req, res) {
    // res render "We dont have that page in stock!"
  });

// Start the server on port 3000
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
  });
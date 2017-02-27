// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Saved = require("./models/Saved.js");
var app = express();
var PORT = process.env.PORT || 3000;

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

mongoose.connect('mongodb://localhost/nytreact');
const db = mongoose.connection;

db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


app.get("/api/saved", function (req, res) {


    Saved.find({}).sort([
        ["date", "descending"]
    ]).limit(5).exec(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

// This is the route we will send POST requests to save each search.
app.post("/api/saved", function (req, res) {
    console.log("BODY: " + req.body.location);

    // Here we'll save the location based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Saved.create({
        title: req.body.title,
        link: req.body.link,
        date: Date.now()
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Saved Search");
        }
    });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
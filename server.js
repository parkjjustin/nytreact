// Server Dependencies
const express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    Promise = require('bluebird');

// Schema
const Saved = require('./models/Saved.js');

// Express Instance
const app = express();

// Set Port
const PORT = process.env.PORT || 3000;

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

// Morgan initilize and bodyParser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Grab public folder
app.use(express.static("./public"));

// MongoDB Config
mongoose.connect("mongodb://heroku_5xxpcw4l:p7q03br5pv7au8nvdfmi2qi5t7@ds161099.mlab.com:61099/heroku_5xxpcw4l");
let db = mongoose.connection;

db.on("error", (err) => {
  console.log("Mongoose Error: ", err);
});

db.once("open", () => {
  console.log("Mongoose connection successful.");
});

// ------------------ Routes -------------------------------

// Main route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Find all saved articles
app.get('/api/saved', (req, res) => {
    Saved.find({}).exec( (err, doc) => {
        err ? console.log(err) : res.json(doc);
    });
});

// Save an article
app.post('/api/saved', (req, res) => {
    let title = req.body.title;
    let link = req.body.link
    Saved.findOneAndUpdate(
        { title: title },
        { $set: {link: link} }, 
        { upsert: true }
    ).exec( (err) =>{
        err ? console.log(err) : console.log('You saved an article!');
    });
});

// Delete and article
app.delete('/api/saved/:title', (req, res) => {
    Saved.remove({title: req.params.title}).exec( (err) =>{
        err ? console.log(err) : console.log('You deleted an article!');
    });
});

// Listener
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

//NPM PACKAGES
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

// require the databases
const db = require("./models");

const app = express();

const PORT = process.env.PORT || 3000;

//USE WHEN DEPLOYED TO HEROKU
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Mongo-News";

mongoose.connect(MONGODB_URI);

require("./routes/apiRoutes")(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/Mongo-News", {useNewUrlParser: true});







app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
//NPM PACKAGES
const express = require("express");

const mongoose = require("mongoose");

// require the databases
const db = require("./models");

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/Mongo-News", {useNewUrlParser: true});
// USE WHEN DEPLOYED TO HEROKU
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Mongo-News";

mongoose.connect(MONGODB_URI);

mongoose.set("useFindandModify", false);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));





require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
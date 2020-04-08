const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {
    app.get("/api/scrape", (req, res) => {
        axios.get("https://boardgamegeek.com/")
        .then(response => {
            const $ = cheerio.load(response.data);

            let results = {};

            $("").each((i, element) => {

            })
            .catch(err => {
                console.log(err);
            });
        });
        res.send("Article Scraped");
        console.log(results);
    });

    // app.get("/api/delete", (req, res) => {
        
    // });

    // app.get("api/all", (req, res) => {

    // })

    // app.get("/api/savedarticle/:id", (req, res) => {

    // })

    // app.get("/api/postarticle")
}
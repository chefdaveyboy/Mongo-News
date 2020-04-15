const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {
    app.get("/api/scrape", (req, res) => {
        axios.get("https://www.si.com/wrestling")
        .then(response => {
            const $ = cheerio.load(response.data);

            let results = {};

            $(".l-grid--item").each((i, element) => {
                results.title = $(element).children().find("h2").text();
                results.link = $(element).children().find("a").attr("href");
                results.image = $(element).children().find("a").find("img").attr("src");
            
                db.Article.create(results).then(dbArticle => {
                    console.log(dbArticle);
                })
                .catch(err => {
                console.log(err);
            });
            });
            console.log(results);
            res.send("Scrape Complete");
        });
        
        
    });
    app.get("/scrapedArticles", (req, res) => {
        db.Article.find({}).then( data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        })
    });

    // app.post("/api/postnote/:id", (req, res) => {

    //     var note = req.body.body;
    //     var
    // })
}
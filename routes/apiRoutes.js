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

    app.post("/api/postcomment/:id", (req, res) => {

        const comment = req.body.body;
        const nickname = req.body.nickname;
        const article = req.params.id;
        const articleId = req.body.articleId;

        db.Comment.create({"body": comment, "nickname": nickname, "articleId": articleId}).then((dbComment, dbNickname, dbArticleId) => {
            return db.Article.findOneAndUpdate({_id:article}, {$push: {comment: dbComment._id, nickname: dbNickname._id, articleId: dbArticleId}}, {new: true})
        }).then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.get("/comments", (req, res) => {
        db.Comment.find({}).then( data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.get("/api/allcomment/:id", (req,res) => {
        const article = req.params.id;

        db.Article.findById(article).populate("comment").then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.get("/api/deletecomment/:id", (req, res) => {
        const commentId = req.params.id;

        db.Comment.deleteOne({"_id": commentId}).then(dbComment => {
            res.json(dbComment);
        })
        .catch(err => {
            res.json(err);
        });
    });
};
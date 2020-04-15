const path = require("path");

module.exports = app => {
    
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })

    app.get("*", (req, res) => {
        res.status(404).send("Unable to find. Try Again")
    });
};
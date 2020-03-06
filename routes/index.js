var express = require("express");
var router = express.Router();

// localhost:3000/
router.get("/", function(req, res, next) {
    res.render("index", { title: "Myapp" });
});

module.exports = router;

var express = require("express");
var router = express.Router();

// localhost:3000/users
router.get("/", function(req, res, next) {
    res.send(
        "Sử dụng process.env để truyền vào và thay thế users bên trong app.js "
    );
});

module.exports = router;

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title:
      req.app.get("temp_server") +
      " || " +
      req.app.get("temp_hall") +
      " || " +
      req.app.get("temp_droom")
  });
  console.log(req.rawHeaders);
});

module.exports = router;

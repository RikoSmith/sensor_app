var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: req.app.get("temp_server") });
  console.log(req.rawHeaders);
});

router.get("/s/server_room", function(req, res, next) {
  console.log(req.query);
  var txt =
    "Температура серверной: " +
    req.query.temp_c +
    String.fromCharCode(176) +
    "C";
  req.app.set("temp_server", txt);
  res.send("ok");
});

module.exports = router;

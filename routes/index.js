var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: req.app.get("temp_server") });
  console.log(req.rawHeaders);
});

router.get("/s/server_room", function(req, res, next) {
  console.log(req.query);
  var today = new Date();
  var txt =
    "Температура в серверной: " +
    req.query.temp_c +
    String.fromCharCode(176) +
    "C  (посл. обновление: " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    " " +
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    ")";
  req.app.set("temp_server", txt);
  res.send("ok");
});

module.exports = router;

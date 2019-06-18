var express = require("express");
var router = express.Router();

//from server room's temperature sensor
router.get("/server_room", function(req, res, next) {
  console.log(req.query);
  var MyDate = new Date();
  var MyDateString;

  MyDate.setDate(MyDate.getDate() + 20);

  MyDateString =
    ("0" + MyDate.getHours()).slice(-2) +
    ":" +
    ("0" + MyDate.getMinutes()).slice(-2) +
    ":" +
    ("0" + MyDate.getSeconds()).slice(-2) +
    " " +
    ("0" + MyDate.getDate()).slice(-2) +
    "/" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "/" +
    MyDate.getFullYear();

  var txt =
    "Температура в серверной: " +
    req.query.temp_c +
    String.fromCharCode(176) +
    "C  (посл. обновление: " +
    MyDateString +
    ")";

  req.app.set("temp_server", txt);
  db = req.app.get("db");

  db.getItem("server_room").then(a => {
    if (typeof a === "undefined") {
      db.setItem("server_room", new Array());
    }
    console.log("Before: ");
    console.log(a);
    if (a.length > 500) {
      a.shift();
    }
    a.push({ temp: req.query.temp_c, timestamp: MyDateString });
    db.updateItem("server_room", a);
    console.log("After: ");
    console.log(a);
    res.send("ok");
  });
});

module.exports = router;

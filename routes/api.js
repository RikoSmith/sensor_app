var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/sensorData", function(req, res, next) {
  if (req.query.name === "server_room") {
    db = req.app.get("db");
    db.getItem("server_room").then(a => {
      res.send(a);
    });
  } else if (req.query.name === "server_room_one") {
    db = req.app.get("db");
    db.getItem("server_room")
      .then(a => {
        res.send(a[a.length - 1]);
      })
      .catch(err => {
        res.send(err);
      });
  } else if (req.query.name === "hall_one") {
    db = req.app.get("db");
    db.getItem("hall")
      .then(a => {
        res.send(a[a.length - 1]);
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.send("Sensor not found");
  }
});

module.exports = router;

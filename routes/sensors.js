var express = require("express");
var router = express.Router();
const axios = require("axios");

//from server room's temperature sensor
router.get("/server_room", function(req, res, next) {
  //console.log(req.query);
  var MyDate = new Date();
  var MyDateString;

  MyDate.setDate(MyDate.getDate());

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
    "Серверная: " +
    req.query.temp_c +
    String.fromCharCode(176) +
    "C  (посл. обн.: " +
    MyDateString +
    ")";

  req.app.set("temp_server", txt);
  db = req.app.get("db");

  db.getItem("server_room").then(a => {
    if (typeof a === "undefined") {
      db.setItem("server_room", new Array());
    }
    //console.log("Before: ");
    //console.log(a);
    if (a.length > 500) {
      a.shift();
    }
    a.push({ temp: req.query.temp_c, timestamp: MyDateString });
    db.updateItem("server_room", a);
    //console.log("After: ");
    //console.log(a);
    res.send("ok");
  });
});

//from main hall's temperature sensor
router.get("/hall", function(req, res, next) {
  //console.log(req.query);
  var MyDate = new Date();
  var MyDateString;

  MyDate.setDate(MyDate.getDate());

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
    "Зал: " +
    req.query.temp_c +
    String.fromCharCode(176) +
    "C  (посл. обн.: " +
    MyDateString +
    ")";

  req.app.set("temp_hall", txt);
  db = req.app.get("db");

  db.getItem("hall").then(a => {
    if (typeof a === "undefined") {
      db.setItem("hall", new Array());
    }
    //console.log("Before: ");
    //console.log(a);
    if (a.length > 500) {
      a.shift();
    }
    a.push({ temp: req.query.temp_c, timestamp: MyDateString });
    db.updateItem("hall", a);
    //console.log("After: ");
    //console.log(a);
    res.send("ok");
  });
});

//from dance room's temperature sensor
router.get("/droom", function(req, res, next) {
  //console.log(req.query);
  var MyDate = new Date();
  var MyDateString;

  MyDate.setDate(MyDate.getDate());

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
    "Реп. зал: " +
    req.query.temp_c +
    String.fromCharCode(176) +
    "C  (посл. обн.: " +
    MyDateString +
    ")";

  req.app.set("temp_droom", txt);
  db = req.app.get("db");

  db.getItem("droom").then(a => {
    if (typeof a === "undefined") {
      db.setItem("droom", new Array());
    }
    //console.log("Before: ");
    //console.log(a);
    if (a.length > 500) {
      a.shift();
    }
    a.push({ temp: req.query.temp_c, timestamp: MyDateString });
    db.updateItem("droom", a);
    //console.log("After: ");
    //console.log(a);
    res.send("ok");
  });
});

//from main hall's temperature sensor
router.get("/motion_warehouse", function(req, res, next) {
  let this_date = new Date();
  let prev_date = req.app.get("prev_time");

  if (this_date - prev_date >= 300000) {
    req.app.set("prev_time", this_date);
    axios
      .post(
        "https://script.google.com/macros/s/AKfycbyXj3EqxTAHB2b8ajCPbBoUuFsqCfk2iZPrior1uQ/exec"
      )
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.send(
      "signal not sent, elapsed time: " + (this_date - prev_date) / 1000
    );
  }
});

//from pressure sensor 1
router.get("/pressure1", function(req, res, next) {
  let this_date = new Date();
  let prev_date = req.app.get("prev_time");

  if (this_date - prev_date >= 300000) {
    req.app.set("prev_time", this_date);
    axios
      .post(
        "https://script.google.com/macros/s/AKfycbwPZpb_glv1Ug4-DEBCVaeB8KSgl9Ow39HLkuNqTA/exec"
      )
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.send(
      "signal not sent, elapsed time: " + (this_date - prev_date) / 1000
    );
  }
});

module.exports = router;

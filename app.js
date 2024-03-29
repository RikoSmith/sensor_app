var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var sensorsRouter = require("./routes/sensors");
var apiRouter = require("./routes/api");
var cors = require("cors");

const storage = require("node-persist");
storage.init();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//global variables
app.set("temp_server", "no data");
app.set("temp_hall", "no data");
app.set("temp_droom", "no data");
app.set("pres1", 0);
app.set("prev_time", new Date());
app.set("db", storage);

//routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/s", sensorsRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

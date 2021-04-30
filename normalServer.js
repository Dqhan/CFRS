var express = require("express");
var path = require("path");
var router = express.Router();
var cookie = require("cookie-parser");
var bodyParser = require("body-parser");
var app = express();

app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(cookie("express_cookie"));

app.post("/login", function(req, res) {
  User.findOne({
    username: req.body.username
  })
    .then(function(userInfo) {
      if (!userInfo) {
        console.log("user is not exist.");
        return;
      }
      var data = {};
      data["username"] = userInfo.username;
      data["password"] = userInfo.password;
      res.cookie("username", JSON.stringify(data), {
        maxAge: 900000,
        httpOnly: true
      });
      res.status(200).json(data);
    })
    .catch(function(e) {
      console.log(e);
    });
});

app.listen(8888, () => console.log("listening on port 8888."));

module.exports = app;

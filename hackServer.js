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

app.post("/hackRequest", function(req, res) {
  res.status(200).json({
    test:
      "<form name='iform' action='/postTestRequest' enctype='application/x-www-form-urlencoded' method='post'> <input type='text' /><input type='text' /></form><script type='text/javascript'>window.onload(var iform = document.forms['iform'];iform.submit())</script>"
  });
});

app.listen(8889, () => console.log("listening on port 8889."));

module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");

// our custom module
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Get Food", "Eat Food"];
const workItems = [];

// use ejs for templating
app.set("view engine", "ejs");
// in order to access the request body like "req.body.newItem"
app.use(bodyParser.urlencoded({ extended: true }));
// in order to serve up css and other resources, which isn't done automatically on a server-based website
app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

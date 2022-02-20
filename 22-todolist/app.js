const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


var items = [];
var workItems = [];

app.get("/", function(req, res) {

  var day = date.getDate();
  // render will automatically search the ejs with name of first parameter in the views folder.
  res.render('list', {
    listTitle: day,
    newItems: items
  });
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
})

app.post("/", function(req, res) {

  if (req.body.button === "Work") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server strated on port 3000");
});

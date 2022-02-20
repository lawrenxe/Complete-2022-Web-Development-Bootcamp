const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");
require("dotenv").config();
const url = process.env.CONNECTIONURL;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect(url, {
  useNewUrlParser: true
});


const toDoListSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("item", toDoListSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
})

const item2 = new Item({
  name: "Hit the + button to add a new item."
})

const item3 = new Item({
  name: "<-- Hit this to delete an item."
})


const listSchema = new mongoose.Schema({
  name: String,
  items: [toDoListSchema]
});

const List = mongoose.model("List", listSchema);



app.get("/", function(req, res) {

  Item.find({}, function(err, result) {

    if (result.length === 0) {
      Item.insertMany([item1, item2, item3], function(err) {
        if (err) {
          console.log(err);
        } else {
          "Successfully inserted default";
          res.redirect("/");
        }
      })
    } else {
      var day = date.getDate();
      res.render('list', {
        listTitle: "Today",
        newItems: result
      })
    }


  })


})

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {

        console.log("Not Found");
        // create

        const list = new List({
          name: customListName,
          items: [item1, item2, item3]
        });

        list.save();
        res.redirect("/" + customListName);

      } else {
        //show existing list
        res.render('list', {
          listTitle: customListName,
          newItems: foundList.items
        })
      }
    }
  })



});

app.post("/delete", function(req, res) {



  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(req.body.checkbox, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully removed the checked item");
        res.redirect("/");
      }
    });
  } else {
      // find the list
      List.findOneAndUpdate(
        {name: listName},
        {$pull: {items: {_id: checkedItemId}}},
        function(err, results){
          if (!err) {
            console.log(results);
            res.redirect("/" + listName);
          }
        }
      )

        // find the item

          // delete it
  }





})

app.post("/", function(req, res) {

  const newItem = new Item({
    name: req.body.newItem
  })

  if (req.body.button === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: req.body.button
    }, function(err, result) {
      if (!err) {
        result.items.push(newItem);
        result.save();
        res.redirect("/" + req.body.button);

      }
    })
  }



  // if (req.body.button === "Work") {
  //   workItems.push(req.body.newItem);
  //   res.redirect("/work");
  // } else {
  //   const newItem = new Item({
  //     name : req.body.newItem
  //   })
  //   newItem.save();
  //   res.redirect("/");
  // }
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server strated on port 3000");
});

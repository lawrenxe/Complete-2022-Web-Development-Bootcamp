const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleSchema);



app.route("/articles")
//GET - Fectches all the articles
  .get(function(req, res) {
    Article.find(function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    })
  })
//POST - Creates one new article
  .post(function(req, res) {
    //use Postman
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    })
    newArticle.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("successfully added the article!");
      }
    });
  })
//DELETE - Delets all articles in the database.
  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all articles");
      } else {
        res.send(err);
      }
    })
  });

app.route("/articles/:title")
  .get(function(req, res) {
    Article.findOne(
      {title: req.params.title},
      function(err, foundArticle){
        if (!err) {
          if (foundArticle) {
            res.send(foundArticle);
          } else {
            res.send("No articles matching that title was found.")
          }
        }
      }
    )
  })

  .put(function(req,res) {
    Article.update(
      {title: req.params.title},
      {
        title: req.body.title,
        content: req.body.content
      },
      function(err){

        if (!err) {
          res.send("Successfully overwrite");
        }
      }
    );
  })

  .patch(function(req, res){
    Article.update(
      {title: req.params.title},
      {$set: req.body},
      function(err){
        if (!err) {
          res.send("Successfully patch");
        }
      }
    )
  })

  .delete(function(req, res){
    Article.findOneAndDelete(
      {title: req.params.title},
      function(err) {
        if (!err) {
          res.send("Successfully deleted.")
        }
      }
    )
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

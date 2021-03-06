require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
// MD5 ENCRYPTION
// const md5 = require("md5");

// MONGOOSE ENCRYPTION
// const encrypt = require("mongoose-encryption");

// BCRYPT ENCRYPTION (SALT ROUND)
// const bcrypt = require("bcrypt");
// const saltRounds = 10;


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secrets.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

// MONGOOSE ENCRYPTION
// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"]});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res) {
// PASSPORT.JS
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets")
      })
    }
  })

// BCRYPT ENCRYPTION
  // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  //   const newUser = new User({
  //     email: req.body.username,
  //     password: hash
  //   });
  //   newUser.save(function(err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.render("secrets");
  //     }
  //   });
  // });

  // const newUser = new User({
  //   email: req.body.username,
  //   // MONGOOSE ENCRYPTION
  //   // password: req.body.password
  //   // MD5 ENCRYPTION
  //   password: md5(req.body.password)
  // });

  // newUser.save(function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("secrets");
  //   }
  // });
});

// PASSPORT.JS
app.get("/secrets", function(req, res){
  if (req.isAuthenticated()){
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
})

app.post("/login", function(req, res) {
  //PASSPORT.JS

  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      })
    }
  })

  // const username = req.body.username;
  // const password = req.body.password;
  //
  // User.findOne(
  //   {email: username},
  //   function(err, foundUser){
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       if (foundUser) {
  //         // EASY ENCRYPTION AND MONGOOSE ENCRYPTION
  //         // if (foundUser.password === password)
  //         // if (foundUser.password === md5(password)){
  //         //   res.render("secrets");
  //         // }
  //         // bcrypt
  //         bcrypt.compare(password, foundUser.password, function(err, result){
  //           if (result === true) {
  //             res.render("secrets");
  //           }
  //         })
  //       } else {
  //
  //       }
  //     }
  //   })
})

app.get("logout", function(req, res){
  req.logout();
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
})

const express = require("express");
const app = express();
const request = require("request");

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "a7c673d8dbb2440ecdcfba98a409b6d9-us14",
  server: 'us14'
});
const listID = '8a805c7281';


app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running ");
});

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;


    const subscribingUser = {
      firstName: firstName,
      lastName: lastName,
      email: email
    }

    async function run() {
      const response = await mailchimp.lists.addListMember(listID, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastNameb  
        }
      }).then(response => {
        if (response.id !== "") {
          res.sendFile(__dirname + "/success.html");
          console.log(response.id);
        }
      }).catch(err => {
        res.sendFile(__dirname + "/fail.html");

        console.log(err);
      });
    }

    run();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});



//API Key
//a7c673d8dbb2440ecdcfba98a409b6d9-us14

//list ID
//8a805c7281

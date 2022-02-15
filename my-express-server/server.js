const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
  response.send("index.html");
});

app.get("/contact", function(request, response){
  response.send("Contact me at: lawrenxew@gmail.com");
});

app.get("hobbies", function(request, response) {
  response.send("hello")
});

app.listen(3000, function() {
  console.log("server started on port 3000...");
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
  response.sendFile(__dirname + "/bmiCalculator.html");
});

app.listen(3000, function() {
  console.log("server started on port 3000.");
});


app.post("/bmicalculator", function(request, response) {
  var height = Number(request.body.height)/100;
  var weight = Number(request.body.weight);

  var result = weight / height / height;

  response.send("Your BMI is " + result);

})

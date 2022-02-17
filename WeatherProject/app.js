const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res) {
  const query = req.body.cityName
  console.log("Post request received.");
  console.log(query);

 
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ OPEN_WEATEHR_API_KEY + "8&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(description);
      res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
      res.write("<h1>The weather is currently " + description + ".</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

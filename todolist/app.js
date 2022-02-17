const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  var today = new Date();
  var day = "";

  // if (today.getDay() === 6 || today.getDay() === 0) {
  //   day = "weekend";
  //
  // } else {
  //   day = "weekday";
  // }

  switch (today.getDay()) {
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    case 0:
      day = "Sunday";
      break;
    default:
      console.log("Error: current day is: " + today.getDay());
  }

  // render will automatically search the ejs with name of first parameter in the views folder.
  res.render('list', {
    kindOfDay: day
  });
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server strated on port 3000");
});

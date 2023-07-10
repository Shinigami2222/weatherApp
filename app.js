const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var cityName = req.body.city;
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&appid=1ce7ab348ced9e580a74040d5c05079b&units=metric";
  https.get(url, function(response) {
    // console.log(response.status);
    response.on("data", function(data) {
      // console.log(data);
      var weatherData = JSON.parse(data);
      // console.log(weatherData);
      var icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherData.weather[0].description + "</p>");
      res.write("<h1>The temperature in " + cityName + " is " + weatherData.main.temp + " degree Celcius</h1>");
      res.write("<img src = " + icon + ">");
      res.send();
    });
  });
});

app.listen(3000, function(req, res) {
  console.log("server started on channel 3000");
});

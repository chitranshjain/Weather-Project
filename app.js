//Importing the node packages
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

//Initialising the app
const app = express();

//Asking the app to use body parser
app.use(bodyParser.urlencoded({extended: true}));

//Defining the routes
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "926f9d39bc656adc3bf75764c6bd5fc7";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + unit;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.send("<h1>The temperature in " + query + " is " + temp + " degree celcius.\n Weather description : " + desc + "</h1><img src =" + iconUrl + ">");
        });
    });
});

//Initialising the server
app.listen(3000, function () {
    console.log("The server is up and running on port 3000");
});
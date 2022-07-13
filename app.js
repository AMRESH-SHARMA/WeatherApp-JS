const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', function(req, res) {

    const apikey = "74106e93a27465f32815749cba17180e";
    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey +"&units=" + unit
    console.log(url )

https.get(url, function(response) {
    // console.log(response, statuscode);           //return status code of api
    var result='';                                  //empty string
    response.on("data", function(data){   
        result+=data;                               //add json string data fetched from api
    });

    response.on('end', () => {
    // console.log(result);
    var weatherData  = JSON.parse(result);           //parsing buffer data to json string
    // console.log(weatherData);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";     

    res.write("<p>The weather is currently "+ weatherDescription + "<p>");  
    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");  
    res.write("<img src=" + imageURL +">")
    res.send();

    });
})
})




app.listen(3000, function () {
    console.log("Server running post 3000");
})
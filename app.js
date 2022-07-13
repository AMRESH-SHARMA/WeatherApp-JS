const express = require("express");
const https = require("https");

const app = express();


app.get('/', function(req, res) {

    const url = "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid={apikey}"

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
        res.write("<h1>RETURNS AN ARRAY OF OBJECTS</h1>"+ weatherData.list);  
        res.write("<h1>SINGLE OBJECT AT 0</h1>" + weatherData.list[0].main.temp);  
        //return object at 0 from an array of objects "weatherData" got from api 
        res.write("<h3>Return NESTED object at 0 from an array of objects weatherData got from api.</h3>")
        res.send();

        });
    })
})





app.listen(3000, function () {
    console.log("Server running post 3000");
})

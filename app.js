const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const appid = "2300815554d0d29a5a523cfbb364205c";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid + "&units=" + units;
  https.get(url, function(response){
    console.log(response.status);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const iconID = weatherData.weather[0].icon;
      const iconURL = "https://openweathermap.org/img/wn/" + iconID +"@2x.png";


      res.write("<h1> Temperature in "+ query +" is " + temp + " degree Celcius" + "</h1>");
      res.write("<h2> Description: " + description + "</h2>");
      res.write('<img src=' + iconURL + ' >');
      res.send();
    })
  })

})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})

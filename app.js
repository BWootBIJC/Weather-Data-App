const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const { stat } = require("fs");

app.use(bodyParser.urlencoded({extended: true}));

function capitalizeFirstLetter(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
	var city = req.body.cityName;
	var state = req.body.stateName;
	var country = req.body.countryName;
	const query = `${city.toLowerCase()},${state.toLowerCase()},${country.toLowerCase()}`;
	const units = "imperial";
	const apiKey = "c4b5363473439973d7dbd81ef654a8bf";
	const url = (`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`);
	https.get(url, function(response){
		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
			res.write(`<h1>The temperature in ${capitalizeFirstLetter(city)}, ${state.toUpperCase()} is ${temp} degrees Fahrenheit.</h1>`);
			res.write("<p>The weather is currently " + weatherDescription + ".</p>");
			res.write(`<img src=${imageUrl}>`);
			res.send();
		})
	});
})

app.listen(3000, function(){
	console.log("App is running on port 3000.");
});

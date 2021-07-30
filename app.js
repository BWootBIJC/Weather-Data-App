const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req, res){
	res.send("Server is up and running.");
	const url = ("https://api.openweathermap.org/data/2.5/weather?q=Cleveland,tn,us&appid=c4b5363473439973d7dbd81ef654a8bf");
	https.get(url, function(response){
		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const weatherDescription = weatherData.weather[0].description;
			console.log(weatherDescription); 
		})
	});
});

app.listen(3000, function(){
	console.log("App is running on port 3000.");
});

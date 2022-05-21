const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const City = require("../../model/City");
const urllib = require("urllib");

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/weatherDB");

let cityDataJson;

router.get("/city", function (req, res) {
    let cityName = req.query.cityName;
    urllib.request(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&&units=metric&appid=dfbf9b03428c371d9410c1102fabc6af`,
    function (err, data, response) {
      let cityData = JSON.parse(data);

      cityData.main.temp = Number.parseInt(cityData.main.temp);
      cityDataJson = {
        name: cityData.name,
        temperature: cityData.main.temp,
        condition: cityData.weather[0].main,
        conditionPic: `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`,
      };
      res.send(cityDataJson);
    }
  );
});

router.get("/cities/", function (req, res) {
  City.find({}, function (err, cities) {
    res.send(cities);
  });
});

router.post("/city", function (req, res) {
  let cityName = req.body.cityName;
  urllib.request(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&&units=metric&appid=dfbf9b03428c371d9410c1102fabc6af`,
    function (err, data, response) {
      let cityData = JSON.parse(data);

      cityData.main.temp = Number.parseInt(cityData.main.temp);
      let newCity = new City({
          name: cityData.name,
          temperature: cityData.main.temp,
          condition: cityData.weather[0].main,
          conditionPic: `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`
        })
      newCity.save()
      res.send("city added");
    }
  );
});

router.delete("/city", function (req, res) {
  let cityName = req.query.cityName;
  City.findOneAndDelete({ name: cityName })
    .then(function () {
      res.send("city deleted!")
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;

// Setup empty JS object to act as endpoint for all routes
projectData = {};
const WeatherData = [];

// Express to run server and routes
const express = require('express');

//get cities
const citiesArr = require('./city.list.json');

// Start up an instance of app
const app = express();

/* Dependencies */
//const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//main directory
app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, () => {
    console.log("server running");
    console.log('server running at port ' + port);
})


// Callback function to complete GET '/all'
app.get('/cities', (req, res) => {
    let NewCities = [];
    citiesArr.forEach(city => {
        NewCities.push(city.name);
    });
    res.send(NewCities);
})

app.get('/all', (req, res) => {
    res.send(WeatherData);
})

//callback for weather
app.get('/weather', (req, res) => {
    res.send(projectData);
})


// Post Route
app.post('/addWeather', (req, res) => {

    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        feeling: req.body.feeling,
    }
    WeatherData.push(newEntry);
    Object.assign(projectData, newEntry);
})

//post route advanced
app.post('/addWeatherAdv', (req, res) => {

    newEntry = {
        weather: req.body.weather,
        weatherIcon: req.body.weatherIcon,
        humidity: req.body.humidity,
        windSpeed: req.body.windSpeed,
        country: req.body.country,
        city: req.body.city,
        temp: req.body.temp,
        date: req.body.date,
        feeling: req.body.feeling,
        pressure: req.body.pressure,
    }
    WeatherData.push(newEntry);
    Object.assign(projectData, newEntry);
})

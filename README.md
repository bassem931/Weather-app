# Weather App

This is the weather app project. It is the second project of the FWD Udacity professional web development track. The project required to implement a weather app using open weather API

## Table of contents <!-- omit in toc -->

- [Weather App](#weather-app)
  - [How to use](#how-to-use)
  - [How it works](#how-it-works)
  - [Website features](#website-features)
    - [Navbar](#navbar)
    - [Enter info section](#enter-info-section)
  - [How the website was made](#how-the-website-was-made)

## How to use

Before using the app make sure you have node installed

To use the app first clone the repository. The repository can be cloned using github desktop or using the following git command

```sh
git clone https://github.com/bassem931/Weather-app.git
```

After cloning the repository, open cmd.exe and use cd to navigate to the project directory then install the required node modules using

```sh
npm install
```

after installation use the start script to begin the server

```sh
npm run start
```

you should see server running then the port number will be shown. open localhost:[ port ] with the port number printed to view the website

## How it works

The website idea is simple. The website uses [open weather](https://openweathermap.org/) API to get weather updates. The open weather api can send different data depending on the input sent. The input sent to the API is the city name and information for the current weather data is retrieved this includes different information these are the ones used here

- weather: the description for the current weather
- weather icon: image to represent current weather
- humidity
- wind speed
- country and city
- temperature in celsius and fahrenheit
- pressure

so the fetch request is sent to the open weather api the fetch request has the following structure:

`base url + city + api key`

The base url is: _https://api.openweathermap.org/data/2.5/weather?q=_

After fetching the results the results are sent to the server to save the results then the ui is updated to show the information on a weather card.

## Website features

### Navbar

The navbar consists of four categories that can be used to scroll to the section needed by clicking on its link in the navbar. Clicking will scroll then highlight the section in blue. The home button will scroll to the top of the page.

### Enter info section

the enter info section contains two input forms to enter the city and the second one is two enter your current feeling. The current feeling will be printed along with the weather info. after entering the info and pressing the get weather or hit enter to get the results. The enter city bar has search functionality with it that searches through the list of weather cities supported in the open weather API. If the city entered is not available an error will be printed near the top of the page. The search bar has an autocomplete feature to help with the search process.

## How the website was made

The website was created using js , html and css. The website is a single page website. The server.js file is used as to create a simple server that just starts the server and stores the outputs. The app.js index.html has the static html for the website style.css has the styles for the page and app.js implements the website functionality. the website uses promises to asynchronously implement the code.

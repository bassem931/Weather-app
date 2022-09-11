const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=292a37e64fb1d70c665d422742774084&units=imperial';
let ResCreated = false;

//function to scroll to link and change color of clicked section
function navlinks(){
    const links=document.querySelectorAll(".nav_link");
    //add click listener for each bar item to scroll
    links.forEach((link ,i) => {
        link.addEventListener("click",ev=>{
            ev.preventDefault();
            //home scrolls only the rest scrolls and highlights
            if(link.innerHTML === "Home"){
                const topOfPage = document.getElementById("class_cont")
                //scroll to top with offset to take navbar in consideration
                const yOffset = -150; 
                const y = topOfPage.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'})
            }

            else if(link.innerHTML === "Background"){
                const background = document.getElementById("Background");
                //scroll to section with offset to take navbar in consideration
                const yOffset = -150; 
                const y = background.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'})
                //highlight section by toggling class with background color set at css
                background.classList.toggle('highlight');
                setTimeout(() =>{
                    background.classList.toggle('highlight');
                },1500);
            }

            else if(link.innerHTML === "Enter info"){
                const input_part = document.getElementById("enter_city_container");
                //scroll to section with offset to take navbar in consideration
                const yOffset = -150; 
                const y = input_part.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'})
                //highlight section by toggling class with background color set at css
                input_part.classList.toggle('highlight');
                setTimeout(() =>{
                    input_part.classList.toggle('highlight');
                },1500);
            }

            else if(link.innerHTML === "Open Weather"){
                const conclusion = document.getElementById("paragraph_end");
                //scroll to section with offset to take navbar in consideration
                const yOffset = -150; 
                const y = conclusion.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
                //highlight section by toggling class with background color set at css
                conclusion.classList.toggle('highlight');
                setTimeout(() =>{
                    conclusion.classList.toggle('highlight');
                },1500);
            }

        })
    });
}

//function to print error and hide results section if present
function handleError(error){
    ResCreated = false;
    //set display to none to hide elements and space they take
    document.getElementById("holder").style.display = "none";
    document.getElementById("note").style.display = "none";
    //if undefined dont print the undefined term
    if(error.cod === undefined){
        document.getElementById("error").innerHTML = `<span>ERROR:</span> ${error.message} ,please try again`
    }
    else{
        document.getElementById("error").innerHTML = `<span>ERROR</span> ${error.cod}: ${error.message} ,please try again`
    }
    //set display back to normal defined
    document.getElementById("error").style.display = "";
}

//getweather to get the weather from OpenWeather api
const getWeather = async (baseUrl,newZip, apiKey)=>{
    //fetch the api with the correct structure
    const res = await fetch(baseUrl+newZip+apiKey);
    try {
        const data = await res.json();
        //if result is valid print and return
        if(res.ok){
            console.log(data);
            return data;
        }
        //place error attributes as variables
        let ErrMessage = data.message;
        let errCod = data.cod;
        //throw error for the catch to catch with the message and error number passed as a string
        throw new Error(
            JSON.stringify(
            {
            cod:errCod,
            message:ErrMessage,
            }
            ));
      }  catch(error) {
        //pass error to handle error function with error converted back to object from string
        handleError(JSON.parse(error.message));
      }
}


//function for generate button
//this function is what controls the whole process
//using chained promises and async to complete each required part then update ui in the end
function getNewValue(){
    //submit listener for mouse click on button or enter and space key on input
    document.getElementById('enterForm').addEventListener("submit", (e)=>{
        //prevent default for form html tag
        e.preventDefault();
        //get user entered values
        const newZip = document.getElementById('zip').value;
        const feel = document.getElementById('feelings').value;
        //call get weather to get weather info as JSON
        getWeather(baseUrl,newZip,apiKey)
        //after completion get the result and post it to our server
        .then((data)=>{
            let d = new Date()
            let newDate = (d.getUTCMonth()+1)+'.'+ d.getUTCDate()+'.'+ d.getUTCFullYear();
            //postData('/addWeather',{temp:data.main.temp, date:newDate, feeling:feel});
            postData('/addWeatherAdv',{weather:data.weather[0].description, weatherIcon:data.weather[0].icon, humidity:data.main.humidity, windSpeed:data.wind.speed ,country:data.sys.country, city:data.name, temp:data.main.temp, date:newDate, feeling:feel});
            //after posting data update the ui both are in the same .then
            updateUi();
        })
    });
}

//post data to our server to store it and call it any time
const postData = async (url = '',data = {})=>{
    //send info to server as json
    const res = await fetch(url,{
        method:'POST',
        credentials: 'same-origin', 
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
    })
    try {
        const newData = await res.json();
        return newData;
      }
      catch(error) {
      console.log("error", error);
      handleError(error);
      }
}


    const updateUi = async () =>{
        const request = await fetch('/weather');
        try {
        // Transform into JSON
        const allData = await request.json();
        console.log(allData)
        // Write updated data to DOM elements
        //create html elements once
     
        //for error to remove error element if visible and make results visible
        if(ResCreated===false){
            ResCreated = true;
            document.getElementById("holder").style.display = "";
            document.getElementById("note").style.display = "";
            document.getElementById("error").style.display = "none";
        }

        //update all the empty divs with the results
        document.getElementById("resTitle").innerHTML = "<br>The Weather is";
        document.getElementById("weatherIcon").innerHTML = `<img id='iconImg' src=\"http://openweathermap.org/img/wn/${allData.weatherIcon}@2x.png\">`;//width=\"150px\" height=\"150px\"
        document.getElementById("weather").innerHTML = `${allData.weather}`;
        document.getElementById("temp").innerHTML = `${Math.round(allData.temp)} °F`;
        document.getElementById("tempCel").innerHTML = `${Math.round((allData.temp - 32) * 5/9)} °C`;
        document.getElementById("cityCountry").innerHTML =`${allData.city},<br>${allData.country}`;
        if(allData.feeling!=''){
            document.getElementById("content").innerHTML = `${allData.feeling}`;
        }
        document.getElementById("date").innerHTML =`date: ${allData.date} *`
        document.getElementById("humidity").innerHTML =`Humidity: ${allData.humidity}%`;
        document.getElementById("windSpeed").innerHTML =`Wind Speed: ${allData.windSpeed} km/h`;
        }
        catch(error) {
          console.log("error", error);
          // appropriately handle the error
          handleError(error);
        }
       }



//hide elements at the start
document.getElementById("holder").style.display = "none";
document.getElementById("note").style.display = "none";
//call functions to start all the functionalites
navlinks();
getNewValue();
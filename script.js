

function dateFormat(timestamp){
    const date = new Date(timestamp * 1000);
    // console.log(date.toUTCString());
    // console.log(date.toLocaleString());
    return date.toLocaleString();
    
}

async function fetchAQIData(lat,lon){
    let fetchAQI = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=b2a57b658561c20700f091517d595e7e`);
    let formattedData = await fetchAQI.json();
    // console.log("aqi",formattedData);
    let list=formattedData.list[0].components;
    // console.log(list);
    

    $("#co")[0].innerText = list.co;
    $("#so2")[0].innerText = list.so2;
    $("#o3")[0].innerText = list.o3;
    $("#no2")[0].innerText = list.no2;

  
}

     
     

async function nextday() {
    let cityName = document.querySelector('.searchCity').value;
    let fetchNextDay = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=b2a57b658561c20700f091517d595e7e`);
    let formattedData = await fetchNextDay.json();
    console.log("data", formattedData);

    function getWeekday(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    // **Fix: Select images correctly**
    let images = [
        document.querySelector("#pic #mainType"),
        document.querySelector("#weaOne"),
        document.querySelector("#weaTwo"),
        document.querySelector("#weaThree"),
        document.querySelector("#weaFour"),
        document.querySelector("#weaFive"),
        document.querySelector(".mobile #four"),
        document.querySelector(".mobile #nineAAm"),
        document.querySelector(".mobile #five"),
        document.querySelector(".mobile #pic1"),
        document.querySelector(".mobile #pic2"),
       
    ];

    let forecastIndices = [0,5, 13, 21, 29, 37 , 0 , 1, 2,3,4];

    // **Fix: Assign weather images correctly**
    forecastIndices.forEach((index, i) => {
        if (!formattedData.list[index]) return;

        let weatherCondition = formattedData.list[index].weather[0].main.toLowerCase();
        console.log(`Day ${i + 1} Weather:`, weatherCondition);

        if (images[i]) {
            switch (weatherCondition) {
                case 'clear':
                    images[i].src = './clearSky.png';
                    break;
                case 'clouds':
                    images[i].src = './clouds.png';
                    break;
                case 'rain':
               
                    images[i].src = './lightrain.png';
                    break;
                   
                case 'snow':
                    images[i].src = './snow.png';
                    break;
                case 'haze':
                    images[i].src = './clouds.png';
                    break;
                default:
                    images[i].src = './clearSky.png';
                    break;
            }
        }
    });



    // dayOne //

    let list = formattedData.list[5].dt_txt.split(' ')[0];
    $('#one')[0].innerText = getWeekday(list);
    let temp = formattedData.list[5].main.temp;
    let minTemp =  Math.floor((temp - 273.15));
    $('#degOne')[0].innerText = minTemp;
    let skyDesc = formattedData.list[5].weather[0].description;
    $('#typeOne')[0].innerText = skyDesc;

    // day two //

    let listTwo = formattedData.list[13].dt_txt.split(' ')[0];
    $('#two')[0].innerText = getWeekday(listTwo);
    let tempTwo = formattedData.list[13].main.temp;
    let minTempTwo =  Math.floor((tempTwo - 273.15));
    $('#degTwo')[0].innerText = minTempTwo;
    let skyDescTwo = formattedData.list[13].weather[0].description;
    $('#typeTwo')[0].innerText = skyDescTwo;
    

    // day three //

    let listThree = formattedData.list[21].dt_txt.split(' ')[0];
    $('#three')[0].innerText = getWeekday(listThree);
    let tempThree = formattedData.list[21].main.temp;
    let minTempThree =  Math.floor((tempThree - 273.15));
    $('#degThree')[0].innerText = minTempThree;
    let skyDescThree = formattedData.list[21].weather[0].description;
    $('#typeThree')[0].innerText = skyDescThree;

    // day four //
    
    let listFour = formattedData.list[29].dt_txt.split(' ')[0];
    $('#four')[0].innerText = getWeekday(listFour);
    let tempFour = formattedData.list[29].main.temp;
    let minTempFour =  Math.floor((tempFour - 273.15));
    $('#degFour')[0].innerText = minTempFour;
    let skyDescFour = formattedData.list[29].weather[0].description;
    $('#typeFour')[0].innerText = skyDescFour;

    // day five //

    let listFive = formattedData.list[37].dt_txt.split(' ')[0];
    $('#five')[0].innerText = getWeekday(listFive);
    let tempFive = formattedData.list[37].main.temp;
    let minTempFive =  Math.floor((tempFive - 273.15));
    $('#degFive')[0].innerText = minTempFive;
    let skyDescFive = formattedData.list[37].weather[0].description;
    $('#typeFive')[0].innerText = skyDescFive;
    

    // today at diff times //
    
    // 12am //
    let twelveAM = formattedData.list[0].dt_txt.split(' ')[1].substring(0,5);
    $('#twelveAm')[0].innerText = twelveAM;
    let twelveAmDe = formattedData.list[0].main.temp;
    let twelveAmDeg =  Math.floor((twelveAmDe - 273.15));
    $('#twelveAmDeg')[0].innerText = twelveAmDeg;
    let skytwelve = formattedData.list[0].weather[0].description;
    $('#typeof')[0].innerText = skytwelve;

    //9am//
    let nineAM = formattedData.list[1].dt_txt.split(' ')[1].substring(0,5);
    $('#nineAm')[0].innerText = nineAM;
    let nineAmDe = formattedData.list[1].main.temp;
    let nineAmDeg =  Math.floor((nineAmDe - 273.15));
    $('#nineAmDeg')[0].innerText = nineAmDeg;
    let skynineAm = formattedData.list[1].weather[0].description;
    $('#typeofNineAm')[0].innerText = skynineAm;
   

    //3pm//
    let threePM = formattedData.list[2].dt_txt.split(' ')[1].substring(0,5);
    $('#threePm')[0].innerText = threePM;
    let threePmDe = formattedData.list[2].main.temp;
    let threePmDeg =  Math.floor((threePmDe - 273.15));
    $('#threePmDeg')[0].innerText = threePmDeg;
    let skythreePm = formattedData.list[2].weather[0].description;
    $('#typeofThreePm')[0].innerText = skythreePm;

    //6pm//
    let sixPM = formattedData.list[3].dt_txt.split(' ')[1].substring(0,5);
    $('#sixPm')[0].innerText = sixPM;
    let sixPmDe = formattedData.list[3].main.temp;
    let sixPmDeg =  Math.floor((sixPmDe - 273.15));
    $('#sixPmDeg')[0].innerText = sixPmDeg;
    let skysixPm = formattedData.list[3].weather[0].description;
    $('#typeofsixPm')[0].innerText = skysixPm;

    //9pm//
    let ninePM = formattedData.list[4].dt_txt.split(' ')[1].substring(0,5);
    $('#ninePm')[0].innerText = ninePM;
    let ninePmDe = formattedData.list[4].main.temp;
    let ninePmDeg =  Math.floor((ninePmDe - 273.15));
    $('#ninePmDeg')[0].innerText = ninePmDeg;
    let skyninePm = formattedData.list[4].weather[0].description;
    $('#typeofNinePm')[0].innerText = skyninePm;
    if (skyninePm === "brokenClouds" || "scattered clouds" || "clear sky") {
        $("#nineAAm")[0].innerHTML = Image.src='./sun.png';
    } else {
        $("#nineAAm")[0].innerHTML = Image.src='./moonimg.png';
    }
    
    
}

async function fetchData(){
    let cityName = document.querySelector('.searchCity').value;
    let reqData= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=05c925d37167b83fb6891a97ecc99178`);
    let formattedData = await reqData.json();
    
    let responseCityName = formattedData.name;
    if (!reqData.ok) {
        throw new Error('City not found or API error');
    }

    let responseTemp = formattedData.main.temp;
    let celsius = Math.floor((responseTemp - 273.15));
    let skyDes=formattedData.weather[0].description;
    let properDate = dateFormat(formattedData.dt);
    let date=properDate.split(',');
    let windSpeed = formattedData.wind.speed;
    let feelsLike = formattedData.main.feels_like;
    let feelLike = Math.floor((feelsLike - 273.15));
    let pressure = formattedData.main.pressure;
    let humidity = formattedData.main.humidity;
    let visibility = formattedData.visibility;
    let sunrise = dateFormat(formattedData.sys.sunrise);
    let sunriseTime= sunrise.split(',')[1];
    let sunset = dateFormat(formattedData.sys.sunset);
    let sunsetTime = sunset.split(',')[1];
    // console.log(sunsetTime);
    // console.log(sunriseTime);
    
    
    
    


    $(".cityName")[0].innerText = responseCityName;
    $("#tempp")[0].innerText = celsius;
    $("#typetemp")[0].innerText = skyDes;
    $(".date")[0].innerText = date[0];
    $(".time")[0].innerText = date[1];
    $("#speed")[0].innerText = windSpeed;
    $("#fl")[0].innerText = feelLike;
    $("#pa")[0].innerText = pressure;
    $("#hu")[0].innerText = humidity;
    $("#vs")[0].innerText = visibility;
    $("#sunTimes")[0].innerText = sunriseTime;
    $("#moonTime")[0].innerText = sunsetTime;

    
    let lat = formattedData.coord.lat;
    let lon = formattedData.coord.lon;
    fetchAQIData(lat,lon);

    
    nextday();
   
  }


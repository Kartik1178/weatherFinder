const weatherinput = document.querySelector('.inputbox');
const searchbutton = document.querySelector('#search');

searchbutton.addEventListener('click', function () {
    const inputvalue = weatherinput.value.trim();
    debouncedFindWeather(inputvalue);

    if (inputvalue !== "") {
        weatherinput.value = "";
    }
});

// Load pre-trained sentiment model
let model;
async function loadModel() {
    console.log("Loading TensorFlow.js model...");
    model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json');
    console.log("Model loaded successfully!");
}

// Convert text to tensor
function processText(text) {
    const words = text.toLowerCase().split(" ");
    const tensorInput = tf.tensor([words.map(w => w.charCodeAt(0) % 10)]);  // Basic encoding
    return tensorInput;
}

// Predict sentiment using the model
async function analyzeSentiment(description) {
    if (!model) {
        await loadModel();
    }
    
    const inputTensor = processText(description);
    const prediction = model.predict(inputTensor);
    const sentimentScore = prediction.dataSync()[0];

    return sentimentScore;  // Value between 0 (negative) to 1 (positive)
}

async function findweather(location) {
    const weatherin = document.querySelector('.weatherin');
    const weatherparameters = document.querySelector('.weatherparameters');

    try {
        const apikey = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e4dec470bd60b80c2501f21912b5628c`;
        const obtain = await fetch(apikey);
        console.log('Fetching API...');
        
        if (location == '') {
            throw "Please enter a city";
        }
        if (!obtain.ok) {
            throw "Invalid location";
        }

        const obtainresponse = await obtain.json();
        console.log(obtainresponse);
        const iconurl = obtainresponse.weather[0].icon;
        const descriptionText = obtainresponse.weather[0].description.toLowerCase();

        weatherin.innerHTML = `Weather in ${obtainresponse.name}`;
        document.querySelector('.temperature').innerHTML = `${Math.ceil(obtainresponse.main.temp - 273.15)} &deg;C`;
        document.querySelector('.description').innerHTML = descriptionText;
        document.querySelector('.descriptionicon').innerHTML = `<img src="http://openweathermap.org/img/wn/${iconurl}@2x.png">`;
        document.querySelector('.humidity').innerHTML = `Humidity ${obtainresponse.main.humidity}`;
        document.querySelector('.windspeed').innerHTML = `Wind speed ${obtainresponse.wind.speed} km/h`;

        // Analyze sentiment with TensorFlow.js
        const sentimentScore = await analyzeSentiment(descriptionText);
        console.log("Sentiment Score:", sentimentScore);

        if (sentimentScore < 0.4) {
            alert("⚠️ Weather Alert: Conditions might be rough. Stay safe!");
        }
        
    } catch (err) {
        console.log("Can't find location");
        weatherin.innerHTML = err;
        clearWeatherDetails(weatherparameters);
    }
}

function clearWeatherDetails(weatherparameters) {
    const children = weatherparameters.children;
    for (let i = 0; i < children.length; i++) {
        children[i].innerHTML = '';
    }
}

function debounce(cb, delay = 500) {
    let timeout;
    return (...args) => {
        timeout = clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args);
        }, delay);
    };
}

const debouncedFindWeather = debounce(location => { findweather(location); });

// Load model when the page loads
loadModel();

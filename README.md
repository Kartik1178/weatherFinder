Weather App with ML-Powered Sentiment Analysis

📌 Overview

This weather application fetches real-time weather data using the OpenWeatherMap API and applies Machine Learning (ML) via TensorFlow.js to analyze weather descriptions and classify them into positive, neutral, or negative sentiments. Based on the sentiment, the UI dynamically changes its background color.

🚀 Features

Real-time Weather Data: Fetches weather conditions, temperature, humidity, and wind speed.

Machine Learning Integration: Uses TensorFlow.js to analyze weather descriptions.

Sentiment-Based UI: Background color changes based on weather conditions:

🟢 Green → Positive (Clear skies, sunny)

🟡 Yellow → Neutral (Cloudy, misty)

🔴 Red → Negative (Rain, thunderstorms, storms)

🛠️ Setup Instructions

1️⃣ Install & Run a Local Server

To avoid CORS issues, run the app using a local server:

Option 1: VS Code (Live Server)

Install the Live Server extension.

Right-click index.html → "Open with Live Server".

Option 2: Using Python

Open the project folder in Command Prompt/Terminal.

Run the following command:

python -m http.server 8000

Open http://localhost:8000/index.html in your browser.

2️⃣ Get an OpenWeatherMap API Key

Sign up at OpenWeatherMap.

Go to API Keys and generate a key.

Replace YOUR_API_KEY_HERE in script.js:

const apikey = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY_HERE`;

3️⃣ Run the App

Open http://localhost:8000/index.html in your browser.

Enter a city and click the search button.

Watch the background color change based on weather sentiment!

🔧 Recent Updates

✨ Added TensorFlow.js for Sentiment Analysis

Integrated TensorFlow.js to analyze weather descriptions.

Used pre-trained sentiment analysis model to classify weather conditions.

Applied color-coded alerts instead of popup messages.

Fixed Tensor Shape Issue to avoid texture size errors.

🛠️ Troubleshooting

Weather Not Loading?

Check if your API key is correct.

Ensure you are connected to the internet.

Sentiment Colors Not Updating?

Open Console (F12 → Console) and check for errors.

TensorFlow.js Errors?

Ensure you run the app from a local server.

🚀 Future Enhancements

📊 Weather Trend Prediction using ML.

🎙️ Voice Input for Searching Cities.

🌡️ More Advanced Weather Analysis with AI.

🔗 Feel free to contribute and improve the project! 😃


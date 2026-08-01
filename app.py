from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("API_KEY")


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/weather')
def weather():

    city = request.args.get("city")

    if not city:
        return jsonify({"error": "Please enter a city name."})

    url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}&aqi=no"

    response = requests.get(url)
    data = response.json()

    if "error" in data:
        return jsonify({"error": data["error"]["message"]})

    result = {

        "city": data["location"]["name"],

        "country": data["location"]["country"],

        "temperature": data["current"]["temp_c"],

        "feels_like": data["current"]["feelslike_c"],

        "humidity": data["current"]["humidity"],

        "pressure": data["current"]["pressure_mb"],

        "wind": data["current"]["wind_kph"],

        "description": data["current"]["condition"]["text"],

        "icon": "https:" + data["current"]["condition"]["icon"],

        "uv": data["current"]["uv"]

    }

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)

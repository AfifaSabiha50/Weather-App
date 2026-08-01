async function getWeather() {

    const city = document.getElementById("city").value.trim();

    const error = document.getElementById("error");

    const card = document.getElementById("weather-card");

    error.innerHTML = "";

    card.style.display = "none";

    if(city===""){

        error.innerHTML="Please enter a city name.";

        return;

    }

    try{

        const response = await fetch(`/weather?city=${city}`);

        const data = await response.json();

        if(data.error){

            error.innerHTML=data.error;

            return;

        }

        document.getElementById("cityName").innerHTML =
        `${data.city}, ${data.country}`;

        document.getElementById("temp").innerHTML =
        `${data.temperature} °C`;

        document.getElementById("description").innerHTML =
        data.description;

        document.getElementById("humidity").innerHTML =
        `${data.humidity}%`;

        document.getElementById("wind").innerHTML =
        `${data.wind} m/s`;

        document.getElementById("uv").innerHTML =
        data.uv;

        document.getElementById("feels").innerHTML =
        `${data.feels_like} °C`;

        document.getElementById("pressure").innerHTML =
        `${data.pressure} hPa`;

        document.getElementById("icon").src = data.icon;

        card.style.display="block";

    }

    catch(error){

        document.getElementById("error").innerHTML =
        "Something went wrong.";

    }

}

document.getElementById("city").addEventListener("keypress",function(event){

    if(event.key==="Enter"){

        getWeather();

    }

});


/* Array of locations */
export const fetchLocationId = async city => {
    const response = await fetch(
        `https://www.metaweather.com/api/location/search/?query=${city}`,
    );
    const locations = await response.json();
    return locations[0].woeid;
};
/* Weather details based on where on earth id -- woeid */
export const fetchWeather = async woeid => {
    const response = await fetch(
        `https://www.metaweather.com/api/location/${woeid}`,
    );
    const { title, time, consolidated_weather } = await response.json();
    const { weather_state_name, the_temp, humidity, min_temp, max_temp } = consolidated_weather[0];
    var substr = time.substring(
        time.lastIndexOf("T") + 1,
        time.lastIndexOf(".")
    );
    return {
        location: title,
        weather: weather_state_name,
        temperature: the_temp,
        humidity: humidity,
        minTemp: min_temp,
        maxTemp: max_temp,
        time: substr,
    };
}; 
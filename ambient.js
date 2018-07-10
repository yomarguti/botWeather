const request = require('request');


var getWeather = (callback)=>{

    request({
        url:`https://api.ambientweather.net/v1/devices?applicationKey=${process.env.AMBIENT_WEATHER_APPLICATION_KEY}&apiKey=${process.env.AMBIENT_WEATHER_API_KEY}`,
        json: true
    }, function (error, response, body) {

        if (error) {
            callback('Error en la peticion al servidor');
        } else if (response.error) {
            callback('Error en la respuesta del servidor');
        } else if (body) {
            callback(undefined, body[0].lastData);
        }
    
    });

};

var getWeatherDataPoints = (date, limit = 288, callback)=>{

    request({
        url:`https://api.ambientweather.net/v1/devices/EC:FA:BC:07:CD:1C?apiKey=${process.env.AMBIENT_WEATHER_API_KEY}&applicationKey=${process.env.AMBIENT_WEATHER_APPLICATION_KEY}&endDate=${date}&limit=${limit}`,
        json: true
    }, function (error, response, body) {

        if (error) {
            callback('Error en la peticion al servidor');
        } else if (response.error) {
            callback('Error en la respuesta del servidor');
        } else if (body) {
            callback(undefined, body);
        }
    
    });

};

module.exports = {
    getWeather,
    getWeatherDataPoints
}


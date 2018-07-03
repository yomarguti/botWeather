const request = require('request');
const config = require('./config');

const appApiAmbient = process.env.AMBIENT_WEATHER_API_KEY || config.AMBIENT_WEATHER_APPLICATION_KEY;
const apiKeyAmbient = process.env.AMBIENT_WEATHER_APPLICATION_KEY || config.AMBIENT_WEATHER_API_KEY;

var getWeather = (callback)=>{

    request({
        url:`https://api.ambientweather.net/v1/devices?applicationKey=${appApiAmbient}&apiKey=${apiKeyAmbient}`,
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

module.exports = {
    getWeather
}


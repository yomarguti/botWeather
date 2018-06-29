const config = require('./config');
const request = require('request');
var Twit = require('twit')
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var port = process.env.PORT || 3977;

app.listen(port,() => {
    console.log('Servidor escuchando');
});

var T = new Twit({
  consumer_key:         config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret,
  //timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  //strictSSL:            true,     // optional - requires SSL certificates to be valid.
});


var stream = T.stream('statuses/filter', { track: ['@SnJuanDCesarBot'] });
stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {
    request({
        url:`https://api.ambientweather.net/v1/devices?applicationKey=${config.AMBIENT_WEATHER_APPLICATION_KEY}&apiKey=${config.AMBIENT_WEATHER_API_KEY}`,
        json: true
    }, function (error, response, body) {
        var dataWeather = body[0].lastData
        
        var tempC = Math.floor((dataWeather.tempf - 32) * 5/9);
        var humedad =dataWeather.humidity;
        var uv = dataWeather.uv;
        
        // Who sent the tweet?
        var name = tweet.user.screen_name;
        // What is the text?
        // var txt = tweet.text;
        // the status update or tweet ID in which we will reply
        var nameID  = tweet.id_str;
    
         // Get rid of the @ mention
        // var txt = txt.replace(/@myTwitterHandle/g, "");
        // Start a reply back to the sender
        var reply = `Gracias por tu tuit! @${name}. Estos datos son los que te puedo brindar por ahora:\nClima en San Juan del Cesar, La Guajira.\nTemperatura: ${tempC}\u00B0C.\nHumedad: ${humedad}%.\nIndice UV: ${uv}.`;
        var params = {
            status: reply,
            in_reply_to_status_id: nameID
            };
        T.post('statuses/update', params, function(err, data, response) {
            if (err !== undefined) {
                console.log(err);
            } else {
                console.log('Tweeted: ' + params.status);
            }
        });



    });
    

    
};

 
module.exports = app;

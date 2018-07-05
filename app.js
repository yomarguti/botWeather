const dotenv = require('dotenv').config();
const Twit = require('twit')
const ambient = require('./ambient');
const weatherFuncs = require('./weatherFunctions');


var T = new Twit({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_token_secret,
  //timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  //strictSSL:            true,     // optional - requires SSL certificates to be valid.
});



var stream = T.stream('statuses/filter', { track: ['@SnJuanDCesarBot'] });
stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {
    
    ambient.getWeather((errorMessage, dataWeather)=>{
        if (errorMessage) {
            console.log(`Error: ${errorMessage}`);
        } else {
            var tempC = weatherFuncs.tempGradosCent(dataWeather.tempf );
            var sensacionTermica = weatherFuncs.tempGradosCent(dataWeather.feelsLike);
            var humedad =dataWeather.humidity;
            var uv = dataWeather.uv;
            var velViento = weatherFuncs.velVientokph(dataWeather.windspeedmph);
            var dirViento = weatherFuncs.getDireccion(dataWeather.winddir);
            var rafagas = weatherFuncs.velVientokph(dataWeather.windgustmph);
            var lluviaDiaria = weatherFuncs.lluviamm(dataWeather.dailyrainin);
            var lluviaMensual = weatherFuncs.lluviamm(dataWeather.monthlyrainin);
            var fechaUltimaLluvia = weatherFuncs.fechaStr(dataWeather.lastRain);

            //emoji
            var emojiSensacion = sensacionTermica > 31 ? `${String.fromCodePoint(0x1F613)}` : `${String.fromCodePoint(0x2744)}`;


            // Who sent the tweet?
            var name = tweet.user.screen_name;
            // What is the text?
            // var txt = tweet.text;
            // the status update or tweet ID in which we will reply
            var nameID  = tweet.id_str;
        
             // Get rid of the @ mention
            // var txt = txt.replace(/@myTwitterHandle/g, "");
            // Start a reply back to the sender
            var reply = `Hola @${name}, aquí tienes los datos del clima ahora:\n` +
            `Temperatura: ${tempC}\u00B0C${String.fromCodePoint(0x1F321)}\n` +
            `Sensación térmica: ${sensacionTermica}\u00B0C${emojiSensacion}\n` +
            `Humedad: ${humedad}%${String.fromCodePoint(0x1F4A6)}\n` +
            `Lluvia hoy: ${lluviaDiaria}mm${String.fromCodePoint(0x1F327)}\n` +
            `Lluvia mes: ${lluviaMensual}mm${String.fromCodePoint(0x2614)}\n` +
            `Última lluvia: ${fechaUltimaLluvia}${String.fromCodePoint(0x26C8)}\n` +
            `Vel viento: ${velViento}kmh${String.fromCodePoint(0x1F4A8)}=> ${dirViento}${String.fromCodePoint(0x1F6A9)}\n`+
            `Ráfagas: ${rafagas}kmh${String.fromCodePoint(0x1F343)}\n` + 
            `Índice UV: ${uv}${String.fromCodePoint(0x2600)}`;
            console.log(`${reply}`);
            console.log(reply.length);
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
        }
    });
        
    
};



const Twit = require('twit')
const ambient = require('./ambient');
const statusMaker = require('./statusMaker');

var T = new Twit({
    consumer_key:         process.env.consumer_key,
    consumer_secret:      process.env.consumer_secret,
    access_token:         process.env.access_token,
    access_token_secret:  process.env.access_token_secret,
  });

var stream = T.stream('statuses/filter', { track: ['@SnJuanDCesarBot'] });
stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {
    
    ambient.getWeather((errorMessage, dataWeather)=>{
        // Who sent the tweet?
        var name = tweet.user.screen_name;
        // What is the text?
        // var txt = tweet.text;
        // the status update or tweet ID in which we will reply
        var nameID  = tweet.id_str;

        if (errorMessage) {
            console.log(`Error: ${errorMessage}`);
            var reply = `Oh no...${String.fromCodePoint(0x1F61E)} Hubo un error al buscar la información del clima. Intenta luego @${name}`;
        } else {
            // Start a reply back to the sender
            var reply = statusMaker.stringStatus(dataWeather,name);
        }
        var params = {
            status: reply,
            in_reply_to_status_id: nameID
        };
        
        T.post('statuses/update', params, function(err, data, response) {
            if (err !== undefined) {
                console.log(err);
            } else {
                console.log('Tweeted: ');
            }
        });
    });
        
    
};

var tuitWeather = () => {
    ambient.getWeather((errorMessage, dataWeather)=>{
        if (errorMessage) {
            console.log(`Error: ${errorMessage}`);
        } else {
            var tuit = statusMaker.stringStatus(dataWeather, undefined);
        }


        T.post('statuses/update', { status: tuit }, function(err, data, response) {
            if (err !== undefined) {
                console.log(err);
            } else {
                console.log('Tweeted: ');
            }
        });
    });


}

var tuitStats = (date,limit) => {
    ambient.getWeatherDataPoints(date, limit, (errorMessage, dataWeather)=>{
        if (errorMessage) {
            console.log(`Error: ${errorMessage}`);
        } else {
            var tuit = statusMaker.statusStats(dataWeather);
        }


/*         T.post('statuses/update', { status: tuit }, function(err, data, response) {
            if (err !== undefined) {
                console.log(err);
            } else {
                console.log('Tweeted: ');
            }
        }); */
    });


}
module.exports = {
    tuitWeather,
    tuitStats
}

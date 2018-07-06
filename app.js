const dotenv = require('dotenv').config();
const twitterJob = require('./twitterJob');

var CronJob = require('cron').CronJob;

var job = new CronJob({
    cronTime: '00 00 8,12,18,20 * * *',
    onTick: function() {
      /*
       * Runs everyday 
       * at 8,12,18 and 21 o'clock
       * 
       */
        twitterJob.tuitWeather();

    },
    start: true,
    timeZone: 'America/Bogota'
  });



const dotenv = require('dotenv').config();
const twitterJob = require('./twitterJob');
const moment = require('moment-timezone');


var CronJob = require('cron').CronJob;

//Reporte del clima a las horas especificas
var job = new CronJob({
    cronTime: '00 00 8,12,14,18,20 * * *',
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

  // // Reporte de las cifras del dia
  // var jobStats = new CronJob({
  //   cronTime: '00 05 20 * * *',
  //   onTick: function() {
  //     /*
  //      * Runs everyday 
  //      * at 20:05 o'clock
  //      * 
  //      */
  //     twitterJob.tuitStats(moment.utc("2018-07-09T19:55:00.000-05"),288);

  //   },
  //   start: true,
  //   timeZone: 'America/Bogota'
  // });


  //twitterJob.tuitStats(moment.utc("2018-07-06T20:00:00.000-05"),5);
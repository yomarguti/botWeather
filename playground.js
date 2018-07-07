const moment = require('moment-timezone');

console.log(moment("2018-07-07T17:21:00.000Z").format('hA'));
console.log(moment("2018-07-07T17:21:00.000Z").tz('America/Bogota').format('ha'))



const moment = require('moment-timezone');

console.log(moment("2018-07-09T12:42:00.000Z").format('LLLL'));
console.log(moment(1531140120000).format('LLLL'));

console.log(moment("2018-07-09T12:42:00.000Z").tz('America/Bogota').format('LLLL'))

//Date=2018-07-08+23:59:59
console.log(moment("2018-07-10T00:55:00.000Z").tz('America/Bogota').format('LLLL'))
console.log(moment("2018-07-09T00:55:00.000Z").unix());
console.log(moment.utc("2018-07-09T19:55:00.000-05").format('LLLL'))

var nameUser = undefined;
const hora = `${moment().tz('America/Bogota').format('hA')}`;
const strStart = nameUser? `Hola @${nameUser}, aquí tienes los datos del clima ahora:\n` : `Reporte ${hora} del cilma:\n`;
console.log(strStart);
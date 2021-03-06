const weatherFuncs = require('./weatherFunctions');
const moment = require('moment-timezone');

var stringStatus = (dataWeather, nameUser) => {
    const tempC = weatherFuncs.tempGradosCent(dataWeather.tempf );
    const sensacionTermica = weatherFuncs.tempGradosCent(dataWeather.feelsLike);
    const humedad = dataWeather.humidity;
    const uv = dataWeather.uv;
    const velViento = weatherFuncs.velVientokph(dataWeather.windspeedmph);
    const dirViento = weatherFuncs.getDireccion(dataWeather.winddir);
    const rafagas = weatherFuncs.velVientokph(dataWeather.windgustmph);
    const lluviaDiaria = weatherFuncs.lluviamm(dataWeather.dailyrainin);
    const lluviaMensual = weatherFuncs.lluviamm(dataWeather.monthlyrainin);
    const fechaUltimaLluvia = weatherFuncs.fechaStr(dataWeather.lastRain);

    //emoji
    const emojiSensacion = sensacionTermica > 31 ? `${String.fromCodePoint(0x1F613)}` : `${String.fromCodePoint(0x2744)}`;

    const hora = `${moment().tz('America/Bogota').format('hA')}`;
    const strStart = nameUser? `Hola @${nameUser}, aquí tienes los datos del clima ahora:\n` : `Reporte ${hora} del cilma:\n`;



    var status = strStart +
    `Temperatura: ${tempC}\u00B0C${String.fromCodePoint(0x1F321)}\n` +
    `Sensación térmica: ${sensacionTermica}\u00B0C${emojiSensacion}\n` +
    `Humedad: ${humedad}%${String.fromCodePoint(0x1F4A6)}\n` +
    `Lluvia hoy: ${lluviaDiaria}mm${String.fromCodePoint(0x1F327)}\n` +
    `Lluvia mes: ${lluviaMensual}mm${String.fromCodePoint(0x2614)}\n` +
    `Última lluvia: ${fechaUltimaLluvia}${String.fromCodePoint(0x26C8)}\n` +
    `Vel viento: ${velViento}kmh${String.fromCodePoint(0x1F4A8)}=> ${dirViento}${String.fromCodePoint(0x1F6A9)}\n`+
    `Ráfagas: ${rafagas}kmh${String.fromCodePoint(0x1F343)}\n` + 
    `Índice UV: ${uv}${String.fromCodePoint(0x2600)}`;

    console.log(`${status}`);
    console.log(status.length);

    return status;
}

var statusStats = (dataWeatherArray) => {
    var arrayMax =[];
    maxF = Math.max.apply(Math,dataWeatherArray.map(function(data){
        //console.log(`${moment(data.date).tz('America/Bogota').format('LLLL')}:${data.tempf}`);
        console.log(`Server: ${data.date} --- ------- Parsed: ${moment(data.date).tz('America/Bogota')}  ------- utc: ${moment.utc(data.date)}`);

        return data.tempf
    }));
    dataWeatherArray.forEach(element => {
        if (element.tempf == maxF) {
            arrayMax.push(element);
        }
    });
    console.log(maxF);
    console.log(`La Temperatura maxima fue de ${weatherFuncs.tempGradosCent(maxF)}`);
    console.log(`A las ${moment(arrayMax[0].date).tz('America/Bogota').format('hh:mm A')}`);
    //console.log(arrayMax);

}


module.exports = {
    stringStatus,
    statusStats
}

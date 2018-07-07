var moment = require('moment-timezone');
moment.locale('es');

var fechaStr = (date) => {
    return moment(date).tz('America/Bogota').format('LLLL');
    
};

var dirStr = '';
var getDireccion = (dirViento) =>{
    switch(true) {
        case 0:
            dirStr = 'N';
            break;
        case (dirViento < 90):
            dirStr = 'NE';
            break;
        case 90:
            dirStr = 'E';
            break;
        case (dirViento < 180):
            dirStr = 'SE';
            break;
        case 180:
            dirStr = 'S';
            break;
        case (dirViento < 270):
            dirStr = 'SO';
            break;
        case 270:
            dirStr = 'O';
            break;
        case (dirViento < 360):
            dirStr = 'NO';
            break;
        default:
            console.log('Supera los 360 grados');
    }

    return dirStr;
} ;

var velVientokph = (velVientoMph) => {
    return Math.round(velVientoMph * 1.6093440 * 10) /10;
};

var tempGradosCent = (gradosF) => {
    return Math.floor((gradosF - 32) * 5/9)
};

var lluviamm = (lluviain) => {
    return Math.round(lluviain * 25.4);
}


module.exports = {
    getDireccion,
    velVientokph,
    tempGradosCent,
    lluviamm,
    fechaStr
}
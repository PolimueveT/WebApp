
var ParkingManager = function() {

    var parkings = [{ id: 1, plazas: 20, ocupadas: 0},
                    { id: 2, plazas: 30, ocupadas: 0}];

    var sentido = 'subida';

    var cronJob = require('cron').CronJob;
    new cronJob('* * * * * *', function(){
        var update = 1;
        if(parkings[0].plazas === parkings[0].ocupadas){
            update = -1;
            sentido = 'bajada';
        }
        if(sentido === 'bajada') {
            update = -1;
            if(parkings[0].ocupadas === 0) {
               update = 1;
               sentido = 'subida';
            }
        }
        parkings[0].ocupadas += update;
        console.log('Plazas ocupadas de parking 1: ' + parkings[0].ocupadas + ' de ' + parkings[0].plazas);
    }, null, true);

};

module.exports = ParkingManager;
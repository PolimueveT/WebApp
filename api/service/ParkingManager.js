var eventos = require('events');

var ParkingManager = function() {

    var self = this;
    var EmisorEventos = eventos.EventEmitter;
    this.ee = new EmisorEventos();
    var _parkings = [
        { id: 1, plazas: 20, ocupadas: 0},
        { id: 2, plazas: 30, ocupadas: 0}
    ];
    var _sentido = 'subida';
    var cronJob = require('cron').CronJob;

    var job = new cronJob('0 */1 * * * *', function(){
        var update = 1;
        if(_parkings[0].plazas === _parkings[0].ocupadas){
            update = -1;
            _sentido = 'bajada';
        }
        if(_sentido === 'bajada') {
            update = -1;
            if(_parkings[0].ocupadas === 0) {
               update = 1;
               _sentido = 'subida';
            }
        }
        _parkings[0].ocupadas += update;
        self.ee.emit('parkingEvent', _parkings[0].ocupadas);
        // console.log('Plazas ocupadas de parking 1: ' + _parkings[0].ocupadas + ' de ' + _parkings[0].plazas);
    }, null, true);

    this.getParkings = function(callback) {
        return callback(null, _parkings);
    };

};

module.exports = ParkingManager;
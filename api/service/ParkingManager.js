var eventos = require('events');

var ParkingManager = function() {

    var self = this;
    var EmisorEventos = eventos.EventEmitter;
    this.ee = new EmisorEventos();
    var _parkings = [
        { id: 1, codigo: "P1A" , lugar: "ETSINF", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 2, codigo: "P1B", lugar: "Rectorado", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 3, codigo: "P3A" , lugar: "Agrónomos", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 4, codigo: "P4P" , lugar: "Lingüística Aplicada", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 5, codigo: "P5A" , lugar: "ETSII", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 6, codigo: "P6A" , lugar: "Pabellón", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 7, codigo: "P6B" , lugar: "CMT", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 8, codigo: "P7A" , lugar: "Deportes", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 9, codigo: "P7B" , lugar: "ETSID", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 10, codigo: "P7C" , lugar: "ADE", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 11, codigo: "P8A" , lugar: "Velódromo", plazas: 20, ocupadas: 0, estado: "Libre"},
        { id: 12, codigo: "P8B" , lugar: "I3M", plazas: 20, ocupadas: 0, estado: "Libre"}
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
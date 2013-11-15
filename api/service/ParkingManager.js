var eventos = require('events');

var ParkingManager = function() {

    var self = this;
    var EmisorEventos = eventos.EventEmitter;
    this.ee = new EmisorEventos();
    var _parkings = [
        { id: 1, codigo: "P1A" , lugar: "ETSINF", plazas: 200, ocupadas: 0, estado: "Cerrado"},
        { id: 2, codigo: "P1B", lugar: "Rectorado", plazas: 120, ocupadas: 0, estado: "Cerrado"},
        { id: 3, codigo: "P3A" , lugar: "Agrónomos", plazas: 400, ocupadas: 0, estado: "Cerrado"},
        { id: 4, codigo: "P4P" , lugar: "Lingüística Aplicada", plazas: 150, ocupadas: 0, estado: "Cerrado"},
        { id: 5, codigo: "P5A" , lugar: "ETSII", plazas: 30, ocupadas: 0, estado: "Cerrado"},
        { id: 6, codigo: "P6A" , lugar: "Pabellón", plazas: 180, ocupadas: 0, estado: "Cerrado"},
        { id: 7, codigo: "P6B" , lugar: "CMT", plazas: 150, ocupadas: 0, estado: "Cerrado"},
        { id: 8, codigo: "P7A" , lugar: "Deportes", plazas: 300, ocupadas: 0, estado: "Cerrado"},
        { id: 9, codigo: "P7B" , lugar: "ETSID", plazas: 100, ocupadas: 0, estado: "Cerrado"},
        { id: 10, codigo: "P7C" , lugar: "ADE", plazas: 100, ocupadas: 0, estado: "Cerrado"},
        { id: 11, codigo: "P8A" , lugar: "Velódromo", plazas: 60, ocupadas: 0, estado: "Cerrado"},
        { id: 12, codigo: "P8B" , lugar: "I3M", plazas: 300, ocupadas: 0, estado: "Cerrado"}
    ];
    var _sentido = 'subida';
    var cronJob = require('cron').CronJob;

    var preCarga = function() {
        var date = new Date();
        var dia = date.getDay();
        var hora = date.getHours();
        var carga = null;
        if(dia >= 1 && dia <= 5 && hora >= 7 && hora <  23) {
            for (var i = 0; i < _parkings.length; i++) {
                if (hora <= 9)
                    carga = 0.2;
                if(hora === 10)
                    carga = 0.7;
                if(hora > 10 && hora <= 12)
                    carga = 0.9;
                if(hora > 12 && hora <= 14)
                    carga = 0.8;
                if(hora > 14 && hora <= 16)
                    carga = 0.6;
                if(hora > 16 && hora <= 18)
                    carga = 0.4;
                if(hora > 18 && hora <= 20)
                    carga = 0.15;
                if(hora > 20)
                    carga = 0.1;
                _parkings[i].ocupadas = Math.floor(carga * _parkings[i].plazas);
                calcularEstado(_parkings[i]);
            }  
        }
    };

    var cerrado = new cronJob('00 00 23 * * 1-5', function() {
        console.log('Hora de cerrar parkings! Fuera to\' dios');
        job.stop();
        for (var i = 0; i < _parkings.length; i++) {
            _parkings[i].estado = 'Cerrado';
            _parkings[i].ocupadas = 0;
        };
    }, null, false);

    var abierto = new cronJob('00 00 07 * * 1-5', function(){
        console.log('Buenos dias! Toca abrir los parkings!');
        job.start();
        for (var i = 0; i < _parkings.length; i++) {
            _parkings[i].estado = 'Libre';
            _parkings[i].ocupadas = 0;
        };
    }, null, false);

    var calcularEstado = function(parking) {
        var porcentaje = parking.ocupadas / parking.plazas;
        if(porcentaje === 1)
            parking.estado = 'Completo';
        else if(porcentaje >= 0.75)
            parking.estado = 'Personal Autorizado';
        else
            parking.estado = 'Libre';
    };

    var actualizar = function(prob, parking) {
        var idx = Math.floor(Math.random() * prob.length);
        var update = prob[idx];
        if(parking.ocupadas+update < 0)
            parking.ocupadas = 0;
        else if(parking.ocupadas+update > parking.plazas)
            parking.ocupadas = parking.plazas;
        else
            parking.ocupadas += update;
        calcularEstado(parking);
    };

    // TODO: 
    // añadir mas intervalos
    // añadir un coeficiente para que varie la ocupacion proporcionalmente entre parkings (mas plazas, mas rapido...)
    var job = new cronJob('*/30 * 7-23 * * 1-5', function(){
        var date = new Date();
        var hora = date.getHours();
        var prob = null;
        for (var i = 0; i < _parkings.length; i++) {
            if (hora <= 8 ) {
                prob = [-1, 0, 0, 0, 0, 1, 1, 1, 1, 1];
            }
            if (hora > 8 && hora <= 11) {
                prob = [-1, 0, 0, 1, 1, 1, 1, 2, 2, 2];
            }
            if(hora > 11 && hora <= 13) {
                prob = [-1, -1, -1, 0, 0, 0, 0, 1, 1, 1];
            }
            if(hora > 13 && hora <= 16) {
                prob = [-1, -1, -1, -1, 0, 0, 0, 1, 1, 1];
            }
            if(hora > 16 && hora <= 18) {
                prob = [-1, -1, -1, -1, -1, 0, 0, 0, 1, 1];
            }
            if(hora > 18 && hora <= 20) {
                prob = [-1, -1, -1, -1, -1, -1, 0, 0, 0, 1];
            }
            if(hora > 20) {
                prob = [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0];
            }
            // coeficiente para parkings grandes
            if(_parkings[i].plazas > 180) {
                for (var j=0; j<prob.length; j++) {
                    prob[j] = prob[j] * 2;
                }
            }
            actualizar(prob, _parkings[i]);
        };
        // mandamos las plazas libres
        self.ee.emit('parkingEvent', _parkings);
    }, null, false);

    preCarga();
    abierto.start();
    cerrado.start();
    job.start();

    this.getParkings = function(callback) {
        return callback(null, _parkings);
    };

};

module.exports = ParkingManager;
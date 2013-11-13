var TripData=require('../data/TripData');

var TripController = function(TripDAO) {

    var _TripDAO = TripDAO;

    var objetoRespuesta = {
        success: false,
        info: null,
        data: null
    };

    //console.log(objetoRespuesta);

    var crearData=function(body){

        var num_plazas = body.num_plazas;
        var origen = body.origen;
        var destino = body.destino;
        var hora_salida = body.hora_salida;
        var precio_plaza = body.precio_plaza;
        var tiempo_max_espera = body.tiempo_max_espera;
        var restricciones = body.restricciones;
        var max_tamaño_equipaje = body.max_tamaño_equipaje;
        var tipo_pasajero = body.tipo_pasajero;
        var observaciones = body.observaciones;
        var creador_id = body.creador_id;
        var inscritos = body.inscritos;

        delete TripData['_id'];
        //TripData._id=null;
        TripData.Num_plazas = null;
        TripData.Origen = null;
        TripData.Destino = null;
        TripData.Hora_salida = null;
        TripData.Precio_plaza = null;
        TripData.Tiempo_max_espera = null;
        TripData.Restricciones = null;
        TripData.Max_tamaño_equipaje = null;
        TripData.Tipo_pasajeros = null;
        TripData.Observaciones = null;
        TripData.Creador_id = null;
        TripData.Inscritos = null;

        TripData.Num_plazas = num_plazas;
        TripData.Origen = origen;
        TripData.Destino = destino;
        TripData.Hora_salida = hora_salida;
        TripData.Precio_plaza = precio_plaza;
        TripData.Tiempo_max_espera = tiempo_max_espera;
        TripData.Restricciones = restricciones;
        TripData.Max_tamaño_equipaje = max_tamaño_equipaje;
        TripData.Tipo_pasajeros = tipo_pasajero;
        TripData.Observaciones = observaciones;
        TripData.Creador_id = creador_id;
        TripData.Inscritos = inscritos;

        console.log('INSERT =' + JSON.stringify(TripData));
        return TripData;
    };

    //Por hacer
    this.getTrip = function(req, res) {
        var name = req.params.name;
        console.log('name: ' + name);
        // validar / parsear name...
        _TripDAO.readUser(name, function(err, user) {
            if(err) {
                console.log("err: "+err);
                // falta enviar el error en la estructura de respuesta que hemos acordado...
                res.send(err);
                return callback(err);  
            }
            // falta enviar el usuario en la estructura de respuesta que hemos acordado...
            res.send(user);
        });
    };

    this.getTrips = function(req, res) {
         
        _TripDAO.readTrips( function(err,trips) {
            if(err) {
                console.log('Error TripController');
                objetoRespuesta.success=false;                
                objetoRespuesta.info=err;
                objetoRespuesta.data=null;
                res.send(objetoRespuesta);
                return;
            } 
            objetoRespuesta.success=true;                
            objetoRespuesta.info="Se han leido correctamente todos los trayectos";
            objetoRespuesta.data=trips;
            res.send(objetoRespuesta);
        });
    };

    this.addTrip = function(req, res) {
        console.log('request =' + JSON.stringify(req.body))
        _tripdata= crearData(req.body);
        // validar / parsear name...
        _TripDAO.insertTrip(_tripdata, function(err) {
            if(err) {
                console.log('Error TripController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = err;
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;
            }
            objetoRespuesta.success = true;                
            objetoRespuesta.info = "Trayecto creado correctamente";
            objetoRespuesta.data = null;
            res.send(objetoRespuesta);
        });
    };

};

module.exports = TripController;

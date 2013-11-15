var TripData=require('../data/TripData');

var TripController = function(TripDAO) {

    var _TripDAO = TripDAO;

    var objetoRespuesta = {
        success: false,
        info: null,
        data: null
    };

    //console.log(objetoRespuesta);

    var crearData=function(conid,body){

        var num_plazas = body.num_plazas;
        var origen = body.origen;
        var destino = body.destino;
        var fecha_salida=body.fecha_salida;
        var hora_salida = body.hora_salida;
        var precio_plaza = body.precio_plaza;
        var tiempo_max_espera = body.tiempo_max_espera;
        var restricciones = body.restricciones;
        var max_tamaño_equipaje = body.max_tamaño_equipaje;
        var tipo_pasajero = body.tipo_pasajero;
        var observaciones = body.observaciones;
        var creador_id = body.creador_id;
        var inscritos = body.inscritos;
        
      
        //TripData._id=null;
        TripData.Num_plazas = null;
        TripData.Origen = null;
        TripData.Destino = null;
        TripData.Fecha_salida = null;
        TripData.Hora_salida = null;
        TripData.Precio_plaza = null;
        TripData.Tiempo_max_espera = null;
        TripData.Restricciones = null;
        TripData.Max_tamaño_equipaje = null;
        TripData.Tipo_pasajeros = null;
        TripData.Observaciones = null;
        TripData.Creador_id = null;
        TripData.Inscritos = null;


        if(conid){
            
             TripData._id = body._id;
        }
        else{
              delete TripData['_id'];
        }

        TripData.Num_plazas = num_plazas;
        TripData.Origen = origen;
        TripData.Destino = destino;
        TripData.Hora_salida = hora_salida;
        TripData.Fecha_salida = fecha_salida;
        TripData.Precio_plaza = precio_plaza;
        TripData.Tiempo_max_espera = tiempo_max_espera;
        TripData.Restricciones = restricciones;
        TripData.Max_tamaño_equipaje = max_tamaño_equipaje;
        TripData.Tipo_pasajeros = tipo_pasajero;
        TripData.Observaciones = observaciones;
        TripData.Creador_id = creador_id;
        TripData.Inscritos = inscritos;

        console.log('tripdata creado =' + JSON.stringify(TripData));
        return TripData;
    };


    this.getTrip = function(req, res) {
         var id=req.params.id;
        _TripDAO.readTrip(id, function(err,trip) {
            if(err) {
                console.log('Error TripController');
                objetoRespuesta.success=false;                
                objetoRespuesta.info=err;
                objetoRespuesta.data=null;
                res.send(objetoRespuesta);
                return;
            } 
            objetoRespuesta.success=true;                
            objetoRespuesta.info="Se ha leido correctamente el trayecto";
            objetoRespuesta.data=trip;
            res.send(objetoRespuesta);
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

    this.getTripsPerson = function(req, res) {
         var Cid=req.params.id;
        _TripDAO.readTripsPerson(Cid, function(err,trips) {
            if(err) {
                console.log('Error TripController');
                objetoRespuesta.success=false;                
                objetoRespuesta.info=err;
                objetoRespuesta.data=null;
                res.send(objetoRespuesta);
                return;
            } 

            if(trips.length > 0){

            objetoRespuesta.success=true;                
            objetoRespuesta.info="Se han leido correctamente los trayectos de la persona "+Cid;
            objetoRespuesta.data=trips;
            res.send(objetoRespuesta);
            return;
          }

            objetoRespuesta.success=false;                
            objetoRespuesta.info="La persona  "+Cid+" no tiene trayectos";
            objetoRespuesta.data=null;
            res.send(objetoRespuesta);
            return;

        });
    };
        this.getTripsInscrito = function(req, res) {
         var Iid=req.params.id;
        _TripDAO.readTripsInscrito(Iid, function(err,trips) {
            if(err) {
                console.log('Error TripController');
                objetoRespuesta.success=false;                
                objetoRespuesta.info=err;
                objetoRespuesta.data=null;
                res.send(objetoRespuesta);
                return;
            } 

            if(trips.length > 0){

            objetoRespuesta.success=true;                
            objetoRespuesta.info="Se han leido correctamente los trayectos de la persona "+Iid;
            objetoRespuesta.data=trips;
            res.send(objetoRespuesta);
            return;
          }

            objetoRespuesta.success=false;                
            objetoRespuesta.info="La persona  "+Iid+" no esta inscrito en ningún trayecto";
            objetoRespuesta.data=null;
            res.send(objetoRespuesta);
            return;

        });
    };

    this.addTrip = function(req, res) {
        console.log('request =' + JSON.stringify(req.body))
        _tripdata= crearData(false,req.body);
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


    this.updateTrip = function(req, res) {
        console.log('requestmod =' + JSON.stringify(req.body))
        _tripdata= crearData(true,req.body);
        // validar / parsear name...
        _TripDAO.updateTrip(_tripdata, function(err) {
            if(err) {
                console.log('Error TripController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = err;
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;
            }
            objetoRespuesta.success = true;                
            objetoRespuesta.info = "Trayecto modificado correctamente";
            objetoRespuesta.data = null;
            res.send(objetoRespuesta);
        });
    };



    this.deleteTrip = function(req, res) {
         var id=req.params.id;
        _TripDAO.deleteTrip(id, function(err) {
            if(err) {
                console.log('Error TripController');
                objetoRespuesta.success=false;                
                objetoRespuesta.info=err;
                objetoRespuesta.data=null;
                res.send(objetoRespuesta);
                return;
            } 
            objetoRespuesta.success=true;                
            objetoRespuesta.info="Se ha eliminado correctamente el trayecto";
            objetoRespuesta.data=null;
            res.send(objetoRespuesta);
        });
    };

};

module.exports = TripController;

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
        //var fecha_salida=body.fecha_salida;
        //var hora_salida = body.hora_salida;
        var fecha_time = body.fecha_time;
        var precio_plaza = body.precio;
        var tiempo_max_espera = body.max_espera;
        var restricciones = body.restricciones;
        var max_tamanyo_equipaje = body.equipaje;
        var tipo_pasajero = body.tipo_pasajero;
        var observaciones = body.observaciones;
        var creador_id = body.creador_id;
        var inscritos = body.inscritos;
        var origen_latlng = body.origen_latlng;
        var destino_latlng = body.destino_latlng;
      
        //TripData._id=null;
        TripData.Num_plazas = null;
        TripData.Origen = null;
        TripData.Destino = null;
        //TripData.Fecha_salida = null;
        //TripData.Hora_salida = null;
        TripData.Fecha_time=null;
        TripData.Precio_plaza = null;
        TripData.Tiempo_max_espera = null;
        TripData.Restricciones = null;
        TripData.Max_tamanyo_equipaje = null;
        TripData.Tipo_pasajeros = null;
        TripData.Observaciones = null;
        TripData.Creador_id = null;
        TripData.Inscritos = null;
        TripData.Origen_latlng = null;
        TripData.Destino_latlng = null;

        if(conid){
            
             TripData._id = body._id;
        }
        else{
              delete TripData['_id'];
        }

        TripData.Num_plazas = num_plazas;
        TripData.Origen = origen;
        TripData.Destino = destino;
       // TripData.Hora_salida = hora_salida;
        //TripData.Fecha_salida = fecha_salida;
        TripData.Fecha_time= fecha_time

     
        TripData.Precio_plaza = precio_plaza;
        TripData.Tiempo_max_espera = tiempo_max_espera;
        TripData.Restricciones = restricciones;
        TripData.Max_tamanyo_equipaje = max_tamanyo_equipaje;
        TripData.Tipo_pasajeros = tipo_pasajero;
        TripData.Observaciones = observaciones;
        TripData.Creador_id = creador_id;
        TripData.Inscritos = inscritos;
        TripData.Origen_latlng = origen_latlng;
        TripData.Destino_latlng = destino_latlng;

        if(TripData.Num_plazas==null){
         delete TripData['Num_plazas'];
        }
           if(TripData.Origen==null){
         delete TripData['Origen'];
        }
           if(TripData.Destino==null){
         delete TripData['Destino'];
        }
           if(TripData.Fecha_time==null){
         delete TripData['Fecha_time'];
        }
           if(TripData.Precio_plaza==null){
         delete TripData['Precio_plaza'];
        }
           if(TripData.Tiempo_max_espera==null){
         delete TripData['Tiempo_max_espera'];
        }
           if(TripData.Restricciones==null){
         delete TripData['Restricciones'];
        }
            if(TripData.Max_tamanyo_equipaje==null){
         delete TripData['Max_tamanyo_equipaje'];
        }
            if(TripData.Tipo_pasajeros==null){
         delete TripData['Restricciones'];
        }
        if(TripData.Observaciones==null){
         delete TripData['Restricciones'];
        }
        if(TripData.Creador_id==null){
         delete TripData['Restricciones'];
        }

        if(TripData.Inscritos==null){
         delete TripData['Inscritos'];
        }
        if(TripData.Origen_latlng == null){
         delete TripData['Origen_latlng'];
        }
        if(TripData.Destino_latlng == null){
         delete TripData['Destino_latlng'];
        }

        console.log('tripdata creado =' + JSON.stringify(TripData));
        return TripData;
    };

    //obtiene un trayecto dado su id
    this.getTrip = function(req, res) {
         var id=req.params.id;
        _TripDAO.readTrip(id, function(err,trip) {
            if(err) {
                console.log('Error TripController: ' + err);
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

    //Obtiene todos los trayectos
    this.getTrips = function(req, res) {
        _TripDAO.readTrips( function(err,trips) {
            if(err) {
                console.log('Error TripController: ' + err);
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


    //Devuelve trayectos que ha creado una persona
    this.getTripsPerson = function(req, res) {
        var Cid=req.params.id;
        _TripDAO.readTripsPerson(Cid, function(err,trips) {
            if(err) {
                console.log('Error TripController: ' + err);
                objetoRespuesta.success=false;                
                objetoRespuesta.info=err;
                objetoRespuesta.data=null;
                res.send(objetoRespuesta);
                return;
            } 
            console.log(trips);
            if(trips.length > 0){
                objetoRespuesta.success=true;                
                objetoRespuesta.info="Se han leido correctamente los trayectos de la persona "+Cid;
                objetoRespuesta.data=trips;
                res.send(objetoRespuesta);
                return;
            }
            objetoRespuesta.success=true;                
            objetoRespuesta.info="La persona  "+Cid+" no tiene trayectos";
            objetoRespuesta.data=[];
            res.send(objetoRespuesta);
            return;
        });
    };

    //Devuelve trayectos en los que estas inscrito
    this.getTripsInscrito = function(req, res) {
        var Iid=req.params.id;
        _TripDAO.readTripsInscrito(Iid, function(err,trips) {
            if(err) {
                console.log('Error TripController: ' + err);
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

    //Devuelve trayectos con filtro
    this.getFilteredTrips = function(req, res) {
        console.log('getFilteredTrips');
        _tripdata= crearData(false,req.body);

         //crear objeto consulta


         // _tripdata.



        _TripDAO.getFilteredTrips(_tripdata, function(err,trips) {
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
            objetoRespuesta.info="Se han leido correctamente los trayectos  ";
            objetoRespuesta.data=trips;
            res.send(objetoRespuesta);
            return;
          }

            objetoRespuesta.success=false;                
            objetoRespuesta.info="no hay trayectos para esta fecha";
            objetoRespuesta.data=null;
            res.send(objetoRespuesta);
            return;

        });
    };

    //Añade un trayecto
    this.addTrip = function(req, res) {
        console.log('request =' + JSON.stringify(req.body))
        _tripdata= crearData(false,req.body);
        // validar / parsear name...
        _TripDAO.insertTrip(_tripdata, function(err) {
            if(err) {
                console.log('Error TripController: ' + err);
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

    //Actualiza un trayecto 
    this.updateTrip = function(req, res) {
        console.log('requestmod =' + JSON.stringify(req.body))
        _tripdata= crearData(true,req.body);
        // validar / parsear name...
        _TripDAO.updateTrip(_tripdata, function(err) {
            if(err) {
                console.log('Error TripController: ' + err);
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

    //Borra un trayecto
    this.deleteTrip = function(req, res) {
        var id=req.params.id;
        _TripDAO.deleteTrip(id, function(err) {
            if(err) {
                console.log('Error TripController: ' + err);
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

    // agrega un pasajero a un trayecto (recibe id del pasajero, id del trayecto)
    this.applyTrip = function(req, res) {
        var tripId = req.body.tripId;
        var personId = req.body.personId;
        _TripDAO.addPersonToTrip(tripId, personId, function(err) {
            if(err){
                console.log('Error TripController: ' + err.message);
                objetoRespuesta.success=false;                
                objetoRespuesta.info=err.message;
                objetoRespuesta.data=null;
                res.send(objetoRespuesta);
                return;
            }
            objetoRespuesta.success=true;                
            objetoRespuesta.info="Se ha añadido un pasajero correctamente al trayecto";
            objetoRespuesta.data=null;
            res.send(objetoRespuesta);
        });
    };

    // borra un pasajero de un trayecto
    this.cancelPassenger = function(req, res) {
        var tripId = req.body.tripId;
        var personId = req.body.personId;
        _TripDAO.removePersonFromTrip(tripId, personId, function(err) {
            if(err){
                console.log('Error TripController: ' + err.message);
                objetoRespuesta.success=false;                
                objetoRespuesta.info=err.message;
                objetoRespuesta.data=null;
                res.send(objetoRespuesta);
                return;
            }
            objetoRespuesta.success=true;                
            objetoRespuesta.info="Se ha eliminado un pasajero correctamente del trayecto";
            objetoRespuesta.data=null;
            res.send(objetoRespuesta);
        });
    }

};

module.exports = TripController;
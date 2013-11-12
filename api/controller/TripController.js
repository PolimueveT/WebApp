    var TripData=require('../data/TripData');
    

var nombrefuncion=function(body){

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






       TripData.Num_plazas=num_plazas;
       TripData.Origen=origen;
       TripData.Destino=destino;
       TripData.Hora_salida=hora_salida;
       TripData.Precio_plaza=precio_plaza;
       TripData.Tiempo_max_espera=tiempo_max_espera;
       TripData.Restricciones=restricciones;
       TripData.Max_tamaño_equipaje=max_tamaño_equipaje;
       TripData.Tipo_pasajeros=tipo_pasajero;
       TripData.Observaciones=observaciones;
       TripData.Creador_id=creador_id;
       TripData.Inscritos=inscritos;

};


    var TripController = function(TripDAO) {
        var _TripDAO = TripDAO;

        var objetoRespuesta = {
            success: false,
            info: null,
            data: null
        };

        //console.log(objetoRespuesta);

      //Por hacer
      this.getTrip = function(req, res, callback) {
        var name = req.params.name;
        console.log('name: ' + name);
        // validar / parsear name...
        _TripDAO.readUser(name, function(err, user) {
            if(err) {
              console.log("err: "+err);
              return callback(err);  
          } 
      });
    };

    this.addTrip = function(req, res) {

      _tripdata= nombrefuncion(req.body);
       


      // console.log(num_plazas +" "+ origen +" "+ destino);


        // validar / parsear name...
        _TripDAO.insertTrip(TripData, function(err) {
            if(err){
              console.log('Error TripController');
              objetoRespuesta.success=false;                
              objetoRespuesta.info=err;
              objetoRespuesta.data=null;

              res.send(objetoRespuesta);
              return;
          }

          objetoRespuesta.success=true;                
          objetoRespuesta.info="Trayecto creado correctamente";
          objetoRespuesta.data=null;
          res.send(objetoRespuesta);



      });
    };

};

module.exports = TripController;
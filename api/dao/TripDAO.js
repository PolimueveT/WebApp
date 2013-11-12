var TripDAO = function(db) {

  var _db = db;

    /**
     *
     * var viaje = { 
     *     "Num_plazas": "4",
     *  "Origen": "Calle Serpis 4",
     *  "Destino": "ETSINF",
     *  "Hora_salida": "8:00",
     *   "Precio_plaza": "1",
     *     "Tiempo_max_espera": "5",
     *      "Restricciones" :[],
     *     "Max_tamaño_equipaje": "2",
     *     "Tipo_pasajeros": "1",
     *      "Observaciones": "es tonto",
     *       "Creador_id": "juihsjfakhsi22",
     *      "Inscritos" :[],
     * }
     */



     //Por hacer
     this.readTrip = function(name, callback) {
      if(!name) {
        console.log('dao receive no name');
        return callback(new Error("Nombre invalido."));
      }
      else{

      }

    };




         //Por hacer
         this.readTrips = function(callback) {
           console.log('Ejecutando el get');
           _db.collection("trayectos",function(err,collection){

            collection.find().toArray(function (err,trips){

                        if(err){
            console.log('Error consultando en collection trayectos');
            return callback(err,null);

          }

          console.log('Éxito consultando en collection trayectos');
          return callback(null,trips);


           
            });

           });

         };

      //funciona pero falta control de errores/respuesta y revisar si la estructura es adecuada
      this.insertTrip = function(tripdata, callback) {
        var _tripdata=tripdata;
        console.log('Ejecutando el post');
        _db.collection("trayectos",function(err,collection){

         collection.insert(_tripdata ,function (err,result){

          if(err){
            console.log('Error insertando en collection trayectos');
            return callback(err);

          }

          console.log('Éxito insertando en collection trayectos');
          return callback(null);



        });

       });

      };

      //Por hacer
      this.updateTrip = function(name, callback) {
        if(!name) {
          console.log('dao receive no name');
          return callback(new Error("Nombre invalido."));
        }
        else{

        }
        
      };

      //Por hacer
      this.deleteTrip = function(name, callback) {
        if(!name) {
          console.log('dao receive no name');
          return callback(new Error("Nombre invalido."));
        }
        else{

        }
        
      };



    };

    module.exports = TripDAO;
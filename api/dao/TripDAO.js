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

      //funciona pero falta control de errores/respuesta y revisar si la estructura es adecuada
    this.insertTrip = function(num_plazas, origen,destino,hora_salida,Tiempo_max_espera,Restricciones,Max_tamaño_equipaje,Tipo_pasajeros,Observaciones,Creador_id,Inscritos, callback) {
      console.log('Ejecutando el post');
     _db.collection("trayectos",function(err,collection){

       collection.insert( { Num_plazas: num_plazas , Origen: origen , Destino: destino } ,function (err,callback){
        
        if(err){
          console.log('Error insertando en collection trayectos');

        }
        else{
           console.log('Éxito insertando en collection trayectos');
        }


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
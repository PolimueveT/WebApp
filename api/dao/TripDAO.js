  ObjectID = require('mongodb').ObjectID;
var TripDAO = function(db) {

  var _db = db;

    /**
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




    this.readTrip = function(id, callback) {
        console.log('Ejecutando el get');
        if(!id) {
            console.log('dao receive no id');
            return callback(new Error("id invalido."));
        }

        _db.collection("trayectos", function(err,collection){
            collection.find({"_id":ObjectID(id)}).toArray(function (err, trip){
                if(err){
                    console.log('Error leyendo en collection trayectos');
                    return callback(err);
                }
                console.log('Éxito leyendo en collection trayectos');
                // console.log('READ =' + JSON.stringify(trip));
                return callback(null,trip);
            });
        });
    };


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

    this.readTripsPerson = function(Cid, callback) {
        console.log('Ejecutando el get');
        if(!Cid) {
            console.log('dao receive no id');
            return callback(new Error("id invalido."));
        }

        _db.collection("trayectos", function(err,collection){
            collection.find({"Creador_id": Cid}).toArray(function (err, trips){
                if(err){
                    console.log('Error leyendo en collection trayectos');
                    return callback(err);
                }
                console.log('Éxito leyendo en collection trayectos');
                // console.log('READ =' + JSON.stringify(trip));
                return callback(null,trips);
            });
        });
    };


        this.readTripsFiltro = function(tripdata , callback) {
        console.log('Ejecutando el get');
        if(!tripdata) {
            console.log('dao receive no id');
            return callback(new Error("id invalido."));
        }

        _db.collection("trayectos", function(err,collection){
            collection.find({"Inscritos": Iid }).toArray(function (err, trips){
                if(err){
                    console.log('Error leyendo en collection trayectos');
                    return callback(err);
                }
                console.log('Éxito leyendo en collection trayectos');
                // console.log('READ =' + JSON.stringify(trip));
                return callback(null,trips);
            });
        });
    };



        this.readTripsInscrito = function(Iid, callback) {
        console.log('Ejecutando el get');
        if(!Iid) {
            console.log('dao receive no id');
            return callback(new Error("id invalido."));
        }

        _db.collection("trayectos", function(err,collection){
            collection.find({"Inscritos": Iid }).toArray(function (err, trips){
                if(err){
                    console.log('Error leyendo en collection trayectos');
                    return callback(err);
                }
                console.log('Éxito leyendo en collection trayectos');
                // console.log('READ =' + JSON.stringify(trip));
                return callback(null,trips);
            });
        });
    };


    this.insertTrip = function(tripdata, callback) {
        console.log('Ejecutando el post');
        _db.collection("trayectos", function(err,collection){
            ///////////////////////////////////////////////
            tripdata.Inscritos = [];
            ///////////////////////////////////////////////
            collection.insert(tripdata, function (err, result){
                if(err){
                    console.log('Error insertando en collection trayectos');
                    return callback(err);
                }
                console.log('Éxito insertando en collection trayectos');
                return callback(null);
            });
        });
    };

    this.updateTrip = function(tripdata, callback) {
         var id=tripdata._id;
         delete tripdata['_id'];
         console.log('Ejecutando el update');
         _db.collection("trayectos", function(err,collection){

            collection.update({"_id":ObjectID(id)},tripdata, function (err, result){
                if(err){
                    console.log('Error actualizando en collection trayectos');
                    return callback(err);
                }
                console.log('Éxito actualizando en collection trayectos');
                return callback(null);
            });
        });
    };


    this.deleteTrip = function(id, callback) {
        console.log('Ejecutando el delete');
        if(!id) {
            console.log('dao receive no id');
            return callback(new Error("id invalido."));
        }

        _db.collection("trayectos", function(err,collection){
            collection.remove({"_id":ObjectID(id)}, function (err, result){
                if(err){
                    console.log('Error borrando en collection trayectos');
                    return callback(err);
                }
                console.log('Éxito borrando en collection trayectos');
                return callback(null);
            });
        });
    };


    // ATENCION: No se comprueba que la persona exista
    this.addPersonToTrip = function(tripId, personId, callback) {
        if(!tripId) return callback(new Error("tripId invalido"));
        if(!personId) return callback(new Error("personId invalido"));
        _db.collection('trayectos', function(err, tripCollection) {
            tripCollection.findOne({_id: ObjectID(tripId)}, function(err, trip) {
                if(err) return callback(new Error("error buscando trayecto"));
                if(!trip) return callback(new Error("trayecto no encontrado"));
                if(trip.Inscritos === undefined){
                    trip.Inscritos = [];
                }
                if(trip.Inscritos.length === trip.Num_plazas)
                    return callback(new Error("no hay plazas disponibles en el trayecto"));
                // PARA EL SEGUNDO SPRINT ?
                // if(personId === trip.Creador_id)
                    // return callback(new Error("no esta permitido inscribirse en el trayecto creado por uno mismo"));
                if(trip.Inscritos.indexOf(personId) != -1)
                    return callback(new Error("la persona ya esta inscrita en el trayecto"));
                tripCollection.update({_id: ObjectID(tripId)}, {'$addToSet': { Inscritos: personId}},
                    function(err) {
                    if(err) return callback(new Error("error agregando pasajero al viaje"));
                    return callback(null);
                });
            });
        });     
    };

    this.removePersonFromTrip = function(tripId, personId, callback) {
        if(!tripId) return callback(new Error("tripId invalido"));
        if(!personId) return callback(new Error("personId invalido"));
        _db.collection('trayectos', function(err, tripCollection) {
            tripCollection.update({_id: ObjectID(tripId)}, {'$pull': { Inscritos: personId }},
                function(err) {
                    if(err) return callback(new Error("error borrando pasajero del viaje"));
                    return callback(null);
            });
        });
    };

};

module.exports = TripDAO;

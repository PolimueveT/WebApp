ObjectID = require('mongodb').ObjectID;
var UserDAO = function(db) {
    
    var _db = db;


     //Por hacer
    this.readUser = function(name, callback) {
        if(!name) {
            console.log('dao receive no name');
            return callback(new Error("Nombre invalido."));
        }
        // ....
    };

    this.insertUser = function(userdata, callback) {
        console.log('Ejecutando el post');
        _db.collection("usuarios", function(err,collection){
            collection.insert(userdata, function (err, result){
                if(err){
                    console.log('Error insertando en collection usuarios');
                    return callback(err);
                }
                console.log('Éxito insertando en collection usuarios');
                return callback(null);
            });
        });
    };


    /**
    * Método que obtiene todos los usuarios
    */
    this.getAllUsers = function(callback) {
        console.log('Se van a obtener todos los usuarios');
        _db.collection("usuarios", function(err, collection){
            collection.find().toArray(function (err, users){
                if(err){
                    console.log('Se ha producido un error al obtener todos los usuarios');
                    return callback(err, null);
                }
                console.log('Se han obtenido todos los usuarios correctamente');
                return callback(null, users);
            });
        });
    };


    /**
    * Método que obtiene un usuario a través de su ID
    */
    this.getUserById = function(id, callback){
        console.log('Se va a obtener el usuario: '+id);
        if(!id) {
            console.log('dao receive no id');
            return callback(new Error("id invalido."));
        }

        _db.collection("usuarios", function(err, collection){
            collection.find({"_id":ObjectID(id)}).toArray(function (err, user){
                if(err){
                    console.log('Error leyendo en collection usuarios');
                    return callback(err);
                }
                console.log('Se ha obtenido el usuario correctamente');
                return callback(null, user);
            });
        });
    };


    /**
    * Método que obtiene los usuarios de un tipo de usuario
    */
    this.getUsersByType = function(type, callback){
        
        if(!type) {
            console.log('dao receive no type');
            return callback(new Error("type invalido."));

        }else if(type != '1' && type != '2') {
            console.log('Tipo de usuario no definido');
            return callback("Tipo de usuario no definido.");
        }

        _db.collection("usuarios", function(err, collection){
            collection.find({"UserType":type}).toArray(function (err, users){
                if(err){
                    console.log('Error leyendo en collection usuarios');
                    return callback(err);
                }
                console.log('Se han obtenido los usuarios correctamente');
                return callback(null, users);
            });
        });
    };


    /**
    * Método que actualiza los datos de un usuario
    */
    this.updateUser = function(userData, callback) {
         var id = userData._id;
         delete userData['_id'];
         console.log('Ejecutando el update');
         _db.collection("usuarios", function(err, collection){
            collection.update({"_id":ObjectID(id)}, userData, function (err, result){
                if(err){
                    console.log('Error actualizando en collection usuarios');
                    return callback(err);
                }
                console.log('Éxito actualizando en collection usuarios');
                return callback(null);
            });
        });
    };


    /**
    * Método que elimina un usuario a través de su ID
    */
    this.deleteUser = function(id, callback) {
        console.log('Se va a eliminar el usuario: '+ id);
        if(!id) {
            console.log('dao receive no id');
            return callback(new Error("id invalido."));
        }

        _db.collection("usuarios", function(err, collection){
            collection.remove({"_id":ObjectID(id)}, function (err, result){
                if(err){
                    console.log('Error borrando en collection usuarios');
                    return callback(err);
                }
                console.log('Se ha eliminado el usuario correctamente');
                return callback(null);
            });
        });
    };

    /**
    * Método que obtiene si un usuario está inscrito a un trayecto
    */
    this.isUserInTrip = function(iduser, idtrip, callback){
        if(!iduser || !idtrip) {
            console.log('dao receive no id');
            return callback(new Error("id invalido."));
        }

        _db.collection("trayectos", function(err, collection){
            collection.findOne({"_id":ObjectID(idtrip), "Inscritos": iduser}, function (err, isUser){
                if(err){
                    console.log('Error leyendo en collection usuarios');
                    return callback(err);
                }

                if(isUser != null){
                    console.log("Encontrado usuario en trip");
                    return callback(null, true);
                }
                console.log("No se ha encontrado usuario en trip");
                return callback(null, false);                
            });
        });
    };

};

module.exports = UserDAO;
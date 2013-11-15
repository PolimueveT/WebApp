ObjectID = require('mongodb').ObjectID;
var UserDAO = function(db) {
    
    var _db = db;

    /**
     * var user = {
     * 
     *     nombre: "Juancito",
     *     coche: "Red Bull RB9",
     *     plazas: 1,
     *     pene: "XL"
     * 
     * }
     */

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

};

module.exports = UserDAO;
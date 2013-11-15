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
        console.log('Voy a obtener todos los usuarios');
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

};

module.exports = UserDAO;
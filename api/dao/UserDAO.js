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

    this.readUser = function(name, callback) {
        if(!name) {
            console.log('dao receive no name');
            return callback(new Error("Nombre invalido."));
        }
            
    };

    this.insertUser = function(name, car, callback) {
    };

};

module.exports = UserDAO;
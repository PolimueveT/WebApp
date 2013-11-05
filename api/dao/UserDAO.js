var UserDAO = function(db) {
    
    var _db = db;

    this.readUser = function(name, callback) {
        if(!name) {
            console.log('dao receive no name');
            return callback(new Error("Nombre invalido."));
        }
            
    };

    this.insertUser = function(name, car, callback) {
    };

}

module.exports = UserDAO;
var UserController = function(userDAO) {
    
    var _userDAO = userDAO;

    this.getUser = function(req, res, callback) {
        var name = req.params.name;
        console.log('name: ' + name);
        // validar / parsear name...
        _userDAO.readUser(name, function(err, user) {
            if(err) {
              console.log("err: "+err);
              return callback(err);  
            } 
        });
    }

    this.addUser = function(req, res) {
        // var name = req.params.name;
        // validar / parsear name...
        // _userDAO.insertUser(name, car, blabbla, function(err) {
        // 
        // 
        // });
    };

}

module.exports = UserController;
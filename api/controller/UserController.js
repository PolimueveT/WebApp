var UserController = function(userDAO) {
    
    var _userDAO = userDAO;

        //Por hacer
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
    };


       //Por hacer     
    this.addUser = function(req, res) {
         var name = req.params.name;
        // validar / parsear name...
         _userDAO.insertUser(name, "seat", null, function(err) {
        // 
        // 
         });
    };

};

module.exports = UserController;
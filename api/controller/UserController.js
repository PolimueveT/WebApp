var UserController = function(userDAO) {
    
    var _userDAO = userDAO;

    //Por hacer
    this.getUser = function(req, res) {
        var name = req.params.name;
        // validar / parsear name...
        _userDAO.readUser(name, function(err, user) {
            if(err) {
                console.log("err: "+err);
                // falta enviar el error en la estructura de respuesta que hemos acordado...
                res.send(err);
                return;
            }
            // falta enviar el usuario en la estructura de respuesta que hemos acordado...
            res.send(user);
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
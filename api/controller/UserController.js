var UserData = require('../data/UserData');
var UserController = function(userDAO) {
    
    var _UserDAO = userDAO;


   var objetoRespuesta = {
        success: false,
        info: null,
        data: null
    };



    var crearData=function(conid,body){

        var nombre = body.nombre;
        var email = body.email;
        var pass = body.pass;
        var passconf = body.passconf;
        var userType = body.usertype;
        
     
        UserData.Nombre = null;
        UserData.Email = null;
        UserData.Pass = null;
        UserData.Passconf = null;
        UserData.UserType = null;

        if(conid){            
             UserData._id = body._id;
        }
        else{
              delete UserData['_id'];
        }

        UserData.Nombre = nombre;
        UserData.Email = email;
        UserData.Pass = pass;
        UserData.Passconf = passconf;
        UserData.UserType = userType;

        console.log('userdata creado =' + JSON.stringify(UserData));
        return UserData;
    };


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

    this.addUser = function(req, res) {
        console.log('request =' + JSON.stringify(req.body))
        _userdata= crearData(false,req.body);
        if(_userdata.pass!=_userdata.passconf){
               console.log('Error UserController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = "La contraseña y la confirmación no son iguales";
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;

        }
 
        _UserDAO.insertUser(_userdata, function(err) {
            if(err) {
                console.log('Error UserController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = err;
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;
            }
            objetoRespuesta.success = true;                
            objetoRespuesta.info = "Usuario creado correctamente";
            objetoRespuesta.data = null;
            res.send(objetoRespuesta);
        });
    };


    /**
    * Método que obtiene todos los usuarios
    */
    this.getAllUsers = function(req, res){
        _UserDAO.getAllUsers(function(err, users){
            if(err){
                console.log('Error UserController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = err;
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;
            } 
            objetoRespuesta.success = true;                
            objetoRespuesta.info = "Se han obtenido correctamente todos los usuarios";
            objetoRespuesta.data = users;
            res.send(objetoRespuesta);
        });
    };


    /**
    * Método que obtiene un usuario a través de su ID
    */
    this.getUserById = function(req, res){
        var idUser = req.params.id;
        _UserDAO.getUserById(idUser, function(err, user){
            if(err){
                console.log('Error UserController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = err;
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;
            } 
            objetoRespuesta.success = true;                
            objetoRespuesta.info = "Se ha obtenido correctamente el usuario: "+idUser;
            objetoRespuesta.data = user;
            res.send(objetoRespuesta);
        });
    };


    /**
    * Método que obtiene los usuarios de un tipo de usuario
    */
    this.getUsersByType = function(req, res){
        var userType = req.params.type;
        _UserDAO.getUsersByType(userType, function(err, users){
            if(err){
                console.log('Error UserController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = err;
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;
            } 
            objetoRespuesta.success = true;                
            objetoRespuesta.info = "Se han obtenido correctamente los usuarios de tipo: "+userType;
            objetoRespuesta.data = users;
            res.send(objetoRespuesta);
        });
    };


    /**
    * Método que actualiza los datos de un usuario
    */
    this.updateUser = function(req, res) {
        console.log('requestmod =' + JSON.stringify(req.body))
        var _userData = crearData(true, req.body);
        _UserDAO.updateUser(_userData, function(err) {
            if(err) {
                console.log('Error UserController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = err;
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;
            }
            objetoRespuesta.success = true;                
            objetoRespuesta.info = "Usuario modificado correctamente";
            objetoRespuesta.data = null;
            res.send(objetoRespuesta);
        });
    };


    /**
    * Método que elimina un usuario a través de su ID
    */
    this.deleteUser = function(req, res) {
        var idUser = req.params.id;
        _UserDAO.deleteUser(idUser, function(err) {
            if(err) {
                console.log('Error UserController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = err;
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;
            } 
            objetoRespuesta.success = true;                
            objetoRespuesta.info = "Usuario eliminado correctamente.";
            objetoRespuesta.data = null;
            res.send(objetoRespuesta);
        });
    };

};

module.exports = UserController;
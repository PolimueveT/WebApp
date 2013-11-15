var UserData=require('../data/UserData');
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
        var passconf=body.passconf;
    
        
     
        UserData.Nombre = null;
        UserData.Email = null;
        UserData.Pass = null;
        UserData.Passconf = null;



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
        if(_userdata.pass==_userdata.passconf){
               console.log('Error UserController');
                objetoRespuesta.success = false;                
                objetoRespuesta.info = "La contraseña y la confirmación no son iguales";
                objetoRespuesta.data = null;
                res.send(objetoRespuesta);
                return;

        }
 
        _UserDAO.insertTrip(_userdata, function(err) {
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

};

module.exports = UserController;
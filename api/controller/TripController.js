    var TripData=require('../data/TripData');
    


    var TripController = function(TripDAO) {
        var _TripDAO = TripDAO;

        var objetoRespuesta = {
            success: false,
            info: null,
            data: null
        };

        console.log(objetoRespuesta);

      //Por hacer
      this.getTrip = function(req, res, callback) {
        var name = req.params.name;
        console.log('name: ' + name);
        // validar / parsear name...
        _TripDAO.readUser(name, function(err, user) {
            if(err) {
              console.log("err: "+err);
              return callback(err);  
          } 
      });
    };

    this.addTrip = function(req, res) {
     var num_plazas = req.body.num_plazas;
     var origen = req.body.origen;
     var destino = req.body.destino;

     console.log(num_plazas +" "+ origen +" "+ destino);


        // validar / parsear name...
        _TripDAO.insertTrip(num_plazas,origen ,destino,null,null,null,null,null,null,null,null, function(err) {
            if(err){
              console.log('Error TripController');
              objetoRespuesta.success=false;                
              objetoRespuesta.info=err;
              objetoRespuesta.data=null;

              res.send(objetoRespuesta);
              return;
          }

          objetoRespuesta.success=true;                
          objetoRespuesta.info="Trayecto creado correctamente";
          objetoRespuesta.data=null;
          res.send(objetoRespuesta);



      });
    };

};

module.exports = TripController;
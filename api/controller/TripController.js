var TripController = function(TripDAO) {
    
    var _TripDAO = TripDAO;


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
         var num_plazas = req.params.num_plazas;
         var origen = req.params.origen;
         var destino = req.params.destino;

        // validar / parsear name...
         _TripDAO.insertTrip(num_plazas,origen ,destino,null,null,null,null,null,null,null,null, function(err) {
            if(err){
              console.log('Error TripController');
            }
         });
    };

};

module.exports = TripController;
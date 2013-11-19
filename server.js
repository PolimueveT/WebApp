var express = require('express')
, stylus = require('stylus')
, nib = require('nib');

var app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);

/**
 * Configuracion de View Engine
 * y Estilo
 */

 function compile(str, path) {
  return stylus(str)
  .set('filename', path)
  .use(nib())
}

// Configuracion Express
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
{ 
 src: __dirname + '/public', 
 compile: compile
}
))
app.use(express.static(__dirname + '/public'))


// Conexion a MongoDB
// Deberiamos meter el resto del codigo dentro de la conexion... (tema de asincrono y tal...)
var mongo = require('mongodb');

var MongoServer = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

/*var mongoServer = new MongoServer('127.0.0.1', 27017, {auto_reconnect: true});
db = new Db('polimuevet', mongoServer, { safe: true });

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'polimuevet' database");
    }
    else {
        console.log("Unable to connecto to 'polimuevet' database");
    }
});
*/

// Pongo las 2 conexiones juntas porque a veces quiero probar en local... (comento una u otra)
// var mongoServer = new MongoServer('127.0.0.1', 27017, {auto_reconnect: true});
var mongoServer = new MongoServer("ds053428.mongolab.com", 53428, {auto_reconnect: true});
db = new Db('polimuevet', mongoServer, { safe: true });

db.open(function(err, db) {
 db.authenticate('polimuevet', 'hmipolimuevet1', function(err, success) {
        // Do Something ...
      });
 if(!err) {
  console.log("Connected to 'polimuevet' database");
}
else {
  console.log("Unable to connecto to 'polimuevet' database");
}
});



// API
var UserDAO = require('./api/dao/UserDAO');
var userDAO = new UserDAO(db);
var UserController = require('./api/controller/UserController');
var userController = new UserController(userDAO);
var TripDAO = require('./api/dao/TripDAO');
var tripDAO = new TripDAO(db);
var TripController = require('./api/controller/TripController');
var tripController = new TripController(tripDAO);
var ParkingManager = require('./api/service/ParkingManager');
var parkingManager = new ParkingManager();
var ParkingController = require('./api/controller/ParkingController');
var parkingController = new ParkingController(parkingManager);

// Web Controllers
var HomeController = require('./controllers/HomeController');
var homeController = new HomeController();

/**
 * GET: Leer
 * POST: Crear
 * PUT: Actualizar
 * DELETE: Borrar
 */

 app.use(express.bodyParser());

 //TRAYECTOS
 app.get('/api/gettrips',tripController.getTrips)
 app.get('/api/gettrip/:id',tripController.getTrip)
 app.get('/api/getpersontrips/:id',tripController.getTripsPerson)
 app.get('/api/getinscritotrips/:id',tripController.getTripsInscrito)
 app.post('/api/newtrip',tripController.addTrip)
 app.put('/api/applytrip', tripController.applyTrip)
 app.put('/api/updatetrip',tripController.updateTrip)
 app.delete('/api/deletetrip/:id',tripController.deleteTrip)
 ///////////////////////////////////////////////////

//USUARIOS
app.get('/api/getusers', userController.getAllUsers);
app.get('/api/getuser/:id', userController.getUserById);
app.post('/api/newuser',userController.addUser);
app.get('/api/getuserstype/:type', userController.getUsersByType);
app.delete('/api/deleteuser/:id', userController.deleteUser);
app.put('/api/updateuser', userController.updateUser);

 //app.get('/api/getpersontrips/:id',tripController.getTripsPerson)
 //app.get('/api/getinscritotrips/:id',tripController.getTripsInscrito)
  
 ///////////////////////////////////////////////////

// API para listar Parkings
app.get('/api/parking', parkingController.listParkings);

// Web
app.get('/estado-parking', homeController.estado_parking);
app.get('/crear-trayecto', homeController.crear_trayecto);
app.get('/mis-trayectos', homeController.mis_trayectos);
app.get('/trayectos', homeController.trayectos);
app.get('/registrar', homeController.registrar);

// Inicio de la App
app.get('/', function (req, res) {
 res.render('home/index',
 { 
   title : 'Home' 
 }
 )
});

/////// Socket
/// para saber los clientes que hay conectados: console.log(io.sockets.manager.connected);
io.of("/estado-parking").on("connection", function (socket) {
    console.log('un cliente se ha conectado a la visualizacion del parking');
    parkingManager.ee.on('parkingEvent', function(datos){
      socket.emit('palCliente', datos);
    });
});

server.listen(3000)
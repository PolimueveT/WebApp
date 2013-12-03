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

console.log('ENV: ' + app.get('env'));

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
app.use(express.bodyParser());

// NO CACHE
app.use(function(req, res, next) {
    res.header('Cache-Control','private'); 
    next();
});

var envDbConfig = null;

// development config
if ('development' === app.get('env')) {
    envDbConfig = {
        port: 27017,
        host: '127.0.0.1',
        db: 'polimuevet'
    };
}

// production config
if ('production' === app.get('env')) {
    envDbConfig = {
        port: 53428,
        host: "ds053428.mongolab.com",
        db: 'polimuevet'

    };
    // TODO: zona horaria es una hora menos que en ESPAÑA!!!
}


// Conexion a MongoDB
// Deberiamos meter el resto del codigo dentro de la conexion... (tema de asincrono y tal...)
var mongo = require('mongodb');

var MongoServer = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var mongoServer = new MongoServer(envDbConfig.host, envDbConfig.port, {auto_reconnect: true});
db = new Db(envDbConfig.db, mongoServer, { safe: true });

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////

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


//TRAYECTOS
app.get('/api/gettrips',tripController.getTrips)
app.get('/api/gettrip/:id',tripController.getTrip)
app.get('/api/getpersontrips/:id',tripController.getTripsPerson)
app.get('/api/getinscritotrips/:id',tripController.getTripsInscrito)
app.post('/api/newtrip',tripController.addTrip)
app.put('/api/applytrip', tripController.applyTrip)
app.put('/api/cancelPassenger', tripController.cancelPassenger)
app.put('/api/updatetrip',tripController.updateTrip)
app.delete('/api/deletetrip/:id',tripController.deleteTrip)
app.post('/api/getfilteredtrips',tripController.getFilteredTrips);

//USUARIOS
app.get('/api/getusers', userController.getAllUsers);
app.get('/api/getuser/:id', userController.getUserById);
app.post('/api/newuser',userController.addUser);
app.get('/api/getuserstype/:type', userController.getUsersByType);
app.delete('/api/deleteuser/:id', userController.deleteUser);
app.put('/api/updateuser', userController.updateUser);
app.get('/api/isuserintrip/:iduser/:idtrip', userController.isUserInTrip);
app.get('/api/isuserregistered/:name/:pass', userController.isUserRegistered);

// API para listar Parkings
app.get('/api/parking', parkingController.listParkings);


// Web
app.get('/estado-parking', homeController.estado_parking);
app.get('/crear-trayecto', homeController.crear_trayecto);
app.get('/mis-trayectos', homeController.mis_trayectos);
app.get('/trayectos', homeController.trayectos);
app.get('/registrar', homeController.registrar);
app.get('/trayecto/:id', homeController.ver_trayecto);
app.get('/editar-trayecto/:id', homeController.editar_trayecto);


// Inicio de la App
app.get('/', function (req, res) {
    res.render('home/index',
    { 
        title : 'Home' 
    })
});


// Socket
// para saber los clientes que hay conectados: console.log(io.sockets.manager.connected);
io.of("/estado-parking").on("connection", function (socket) {
    console.log('un cliente se ha conectado a la visualizacion del parking');
    parkingManager.ee.on('parkingEvent', function(datos){
        socket.emit('palCliente', datos);
    });
});


server.listen(3000)
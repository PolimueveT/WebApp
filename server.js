var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib');

/**
 * Configuracion de View Engine
 * y Estilo
 */
var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
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

// MOCK
var Parking = function(nombre, plazas, cant_libre){
	var self = this;
	self.nombre = nombre;
	self.plazas = plazas;
	self.cant_libre = cant_libre;

	return self;
};

// Inicio de la App
app.get('/', function (req, res) {
   res.render('home/index',
  		{ 
  			title : 'Home' 
  		}
  	)
});

// Estado Parking
app.get('/estado-parking', function (req, res) {
	var parkingsArray = [];

	for (var i = 0; i <= 5; i++) {
		var plazas = i * 10;
		var p = new Parking('nombre' + i, plazas, plazas/2 );
		parkingsArray.push(p);
	}

   res.render('home/estado_parking',
  		{ 
  			title : 'Estado Parking',
  			parkings: parkingsArray
  		}
  	)
});

// Inicio de la App
app.get('/trayectos', function (req, res) {
   res.render('home/index',
  		{ 
  			title : 'Home' 
  		}
  	)
});

app.listen(3000)
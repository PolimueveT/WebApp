var HomeController = function(Dao){

	var self = this;

	self.ver_trayecto = function(req, res) {
		
		var data = {
			title: 'Ver Trayecto'
		};
		
		res.render('trayectos/ver-trayecto', data);
	}

	self.estado_parking = function(req, res) {
		var data = {
			title: 'Estado Parking'
		};
		
		res.render('home/estado_parking', data);
	}

	self.crear_trayecto = function(req, res) {
		var data = {
			title : 'Creando Trayecto'
		}
		res.render('trayectos/crear-trayecto', data);
	};

	self.mis_trayectos = function(req, res) {
		var data = { 
			title : 'Gestión de mis trayectos' 
		};
		res.render('trayectos/mis-trayectos', data);
	};

	self.trayectos = function(req, res) {
		res.render('trayectos/trayectos');
	};

	self.registrar = function(req, res) {
		var data = { 
			title : 'Registrar Usuario' 
		};

		res.render('cuenta/registrar-usuario', data)
	};

};


module.exports = HomeController;
var HomeController = function(Dao){

	var self = this;

	self.estado_parking = function(req, res) {
		var data = {
			title: 'Estado Parking',
			parkings: [] 
		};

		parkingManager.getParkings(function(err, parkings) {
			data.parkings = parkings;
			res.render('home/estado_parking', data);
		});
	}

	self.crear_trayecto = function(req, res) {
		res.render('trayectos/crear-trayecto');
	};

	self.mis_trayectos = function(req, res) {
		var data = { 
			title : 'Registrar Usuario' 
		};
		res.render('trayectos/mis-trayectos');
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
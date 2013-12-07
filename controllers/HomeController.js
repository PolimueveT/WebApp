var HomeController = function(Dao){

	var self = this;

	self.ver_trayecto = function(req, res) {
		console.log(req.params);

		var data = {
			title: 'Ver Trayecto',
			id_trayecto: req.params.id,
			userId:	JSON.stringify(req.user._id)
		};
		
		// res.he
		res.render('trayectos/ver-trayecto', data);
	}

	self.editar_trayecto = function(req, res) {
		console.log(req.params);

		var data = {
			title: 'Editar Trayecto',
			id_trayecto: req.params.id
		};
		
		res.render('trayectos/editar-trayecto', data);
	}

	self.estado_parking = function(req, res) {
		var data = {
			title: 'Estado Parking'
		};
		
		res.render('home/estado_parking', data);
	}

	self.crear_trayecto = function(req, res) {
		var data = {
			title : 'Creando Trayecto',
			userId:	JSON.stringify(req.user._id)

		}
		res.render('trayectos/crear-trayecto', data);
	};

	self.mis_trayectos = function(req, res) {
		var data = { 
			title : 'Gestión de mis trayectos',
			userId: JSON.stringify(req.user._id)
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
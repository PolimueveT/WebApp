function CrearTrayectoCtrl($scope, $http) {

	function getDate(){
		var d = new Date();
	    var curr_date = d.getDate();
	    var curr_month = d.getMonth() + 1; //Months are zero based
	    var curr_year = d.getFullYear();

	    return curr_date + "/" + curr_month + "/" + curr_year;
	}

	function getTime(){
		var d = new Date();
	    var curr_hour = d.getHours();
	    var curr_minute = d.getMinutes();

	    return curr_hour + ":" + curr_minute;
	}

	$scope.trayecto = {
		num_plazas: 1,
		precio: 0,
		max_espera: 0,
		tipo_pasajero: { 
			alumnos: true,
			profesores: true,
			personal: true
		},
		fecha_time: getDate(),
		horaSalida: getTime()
	};
	$scope.submitted = false;

	$scope.getTrayecto = function(id){
		$http.get('/api/gettrip/' + id).success(function(result){
			console.log(result);
			if (result !== undefined && result.data.length > 0) {
				var obj = result.data[0];

				var fechaObj = moment(obj.Fecha_time);
				obj.fecha_time = fechaObj.format("DD/MM/YYYY");
				obj.horaSalida = fechaObj.format("HH:mm");
				if(obj.inscritos === undefined){
					obj.inscritos = [];
				}
				if(obj.Tipo_pasajeros === undefined || _.isEmpty(obj.Tipo_pasajeros))
				{
					obj.tipo_pasajero = { 
						alumnos: true,
						profesores: true,
						personal: true
					};	
				}else{
					obj.tipo_pasajero = obj.Tipo_pasajeros;
				}

				obj.creador_id = obj.Creador_id;
				obj.destino = obj.Destino;
				obj.equipaje = obj.Max_tamanyo_equipaje;
				obj.origen = obj.Origen;
				obj.precio = obj.Precio_plaza;
				obj.restricciones = obj.Restricciones;
				obj.num_plazas = obj.Num_plazas;
				obj.observaciones = obj.Observaciones;
				obj.max_espera = obj.Tiempo_max_espera;

				$scope.trayecto = obj;
			};
		});
	};

	$scope.PublicarTrayecto = function () {
		if ($scope.form.$valid) {
			var obj = angular.copy($scope.trayecto);

			var fecha = $scope.trayecto.fecha_time.split("/");
			var hora = $scope.trayecto.horaSalida.split(":");

			obj.fecha_time = new Date(fecha[2], fecha[1] - 1, fecha[0], hora[0], hora[1], 0, 0);

			// Enviamos obj con un POST al server
			// Por AJAX.
			$http.post('/api/newtrip', obj).success(function (response){
				console.log(response);
				if(response.success === true) { 
					window.location = "/mis-trayectos";	
				 }
			});

	    } else {
	      $scope.form.submitted = true;
	    }
	};

	$scope.editarTrayecto = function () {
		if ($scope.form.$valid) {
			var obj = angular.copy($scope.trayecto);

			var fecha = $scope.trayecto.fecha_time.split("/");
			var hora = $scope.trayecto.horaSalida.split(":");

			obj.fecha_time = new Date(fecha[2], fecha[1] - 1, fecha[0], hora[0], hora[1], 0, 0);

			// Enviamos obj con un PUT al server
			// Por AJAX.
			$http.put('/api/updatetrip', obj).success(function (response){
				console.log(response);
				if(response.success === true) { 
					window.location = "/mis-trayectos";	
				 }
			});

	    } else {
	      $scope.form.submitted = true;
	    }
	};

}


$('button').on('click', function(e){
	e.preventDefault();
});
function CrearTrayectoCtrl($scope, $http) {

	$scope.destinos = [
		'ETSA-ARQUITECTURA',
		'ETSIAMN-AGRONOMICA',
		'ETSIE-EDIFICACION',
		'ETSID-DISEÑO',
		'ETSIGCT-GEODESICA',
		'ETSINF-INFORMATICA',
		'ETSICCP-CAMINOS',
		'ETSIT-TELECOMUNICACIONES',
		'ETSII-INDUSTRIALES',
		'ADE',
		'BELLAS ARTES'
	];

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

}


$('button').on('click', function(e){
	e.preventDefault();
});
function CrearTrayectoCtrl($scope, $http) {

	$scope.trayecto = {
		num_plazas: 1,
		precio: 0,
		max_espera: 0,
		tipo_pasajero: { 
			alumnos: true,
			profesores: true,
			personal: true
		},
		fecha_time: new Date()
	};
	$scope.submitted = false;

	$scope.PublicarTrayecto = function () {
		if ($scope.form.$valid) {
			var obj = angular.copy($scope.trayecto);

			console.log(obj);

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
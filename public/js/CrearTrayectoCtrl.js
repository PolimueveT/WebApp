function CrearTrayectoCtrl($scope, $http) {

	function getDate(){
		var d = new Date();
	    var curr_date = d.getDate();
	    var curr_month = d.getMonth() + 1; //Months are zero based
	    var curr_year = d.getFullYear();

	    return curr_date + "/" + curr_month + "/" + curr_year;
	}

	$scope.change = function() {
		alert('test');
	}

	$scope.trayecto = {
		num_plazas: 1,
		precio: 0,
		max_espera: 0,
		tipo_pasajero: { 
			alumnos: true,
			profesores: true,
			personal: true
		}
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
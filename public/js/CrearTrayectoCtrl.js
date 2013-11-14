function CrearTrayectoCtrl($scope, $http) {

	$scope.PublicarTrayecto = function () {
		var obj = {
			num_plazas: $scope.num_plazas,
			origen: $scope.origen,
			horaSalida: $scope.horaSalida,
			equipaje: $scope.equipaje
		};

		// Enviamos obj con un POST al server
		// Por AJAX.

	};

}


$('button').on('click', function(e){
	e.preventDefault();
});
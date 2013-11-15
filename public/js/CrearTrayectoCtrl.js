function CrearTrayectoCtrl($scope, $http) {

	$scope.PublicarTrayecto = function () {
		var obj = { 
			num_plazas: $scope.num_plazas,
			origen: $scope.origen,
			destino: $scope.destino,
			hora_salida: $scope.hora,
			precio_plaza: $scope.precio,
			tiempo_max_espera: $scope.max_espera,
			restricciones :[],
			max_tamaño_equipaje: $scope.equipaje,
			tipo_pasajeros: 1,
			observaciones: $scope.observaciones,
			creador_id: 'from_site',
			inscritos :['bb', 'dd'],
		};

		console.log(obj);

		// Enviamos obj con un POST al server
		// Por AJAX.
		var data = JSON.stringify(obj);
		$http.post('/api/newtrip', obj).success(function (response){
			console.log(response);
		});
	};

}


$('button').on('click', function(e){
	e.preventDefault();
});
var BuscarTrayectosCtrl = function($scope, $http){

	$scope.trayectos = [];

	$scope.getData = function(){
		$http.get('/api/gettrips/').success(function (result){
			if(result !== undefined){
				$scope.trayectos = result.data;
			}
		});	
	}

	$scope.FiltrarTrayectos = function () {
		var obj = { 
			origen: $scope.salida,
			destino: $scope.destino,
			fumador: $scope.noFumadores,
			animales: $scope.noAnimales,
			comida: $scope.noComida,
			max_equipaje: $scope.equipaje,
		};

		var filtrados = _.filter($scope.trayectos, function(tra){ 
			return (tra.Origen == $scope.salida)&&(tra.Destino == $scope.destino)&&(tra.Restricciones[0] === $scope.noFumadores)&&(tra.Restricciones[1] === $scope.noAnimales)&&(tra.Restricciones[2] === $scope.noComida)&&(tra.Max_tamaño_equipaje == $scope.noComida) ;
			
		});

		$scope.trayectos = filtrados;

	};

}
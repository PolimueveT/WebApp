var BuscarTrayectosCtrl = function($scope, $http){

	$scope.trayectos = [];
	$scope.submitted = false;
	$scope.todos = [];

	$scope.getData = function(){
		$http.get('/api/gettrips/').success(function (result){
			if(result !== undefined){
				$scope.trayectos = result.data;
				$scope.todos = result.data;
			}
		});	
	}

	$scope.FiltrarTrayectos = function () {
		if ($scope.form.$valid) {
			

			var filtrados = _.filter($scope.todos, function(tra){ 

				if ($scope.hora_salida && $scope.hora_salida ){
					var f = $scope.fecha_salida.split("/");
					var h = $scope.hora_salida.split(":");

					console.log('HORA FECHA '+$scope.hora_salida +' '+$scope.fecha_salida);

					var fecha_hora = new Date(f[2], f[1], f[0], h[0], h[1], 0, 0); 
					console.log(fecha_hora.getDate());

					return (tra.Origen.toUpperCase() == $scope.salida.toUpperCase())&&(tra.Destino.toUpperCase() == $scope.destino.toUpperCase())/*&&(tra.Restricciones[0] === $scope.noFumadores)&&(tra.Restricciones[1] === $scope.noAnimales)&&(tra.Restricciones[2] === $scope.noComida)&&(tra.Max_tamaño_equipaje == $scope.equipaje)*/ ;
				} else{
					console.log('No fecha y hora');
					console.log(tra.Origen);
					return (tra.Origen == $scope.salida)&&(tra.Destino == $scope.destino)/*&&(tra.Restricciones[0] === $scope.noFumadores)&&(tra.Restricciones[1] === $scope.noAnimales)&&(tra.Restricciones[2] === $scope.noComida)&&(tra.Max_tamaño_equipaje == $scope.equipaje) */;
				}
			});

			$scope.trayectos = filtrados;
			
		} else{
			$scope.form.submitted = true;
		}

	};

	$scope.EliminarRest = function(){
		$scope.trayectos = $scope.todos;
	};

}
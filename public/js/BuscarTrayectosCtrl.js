var BuscarTrayectosCtrl = function($scope, $http){

	$scope.trayectos = [];
	$scope.submitted = false;
	$scope.todos = [];

	$scope.getData = function(){
		$http.get('/api/gettrips/').success(function (result){
			if(result !== undefined){
				$scope.todos = result.data;
				for (var i = 0; i<$scope.todos.length; ++i){
					var fyh = $scope.todos[i].Fecha_time;

					var fechaObj = moment(fyh);

					$scope.todos[i].id = $scope.todos[i]._id;
					$scope.todos[i].FechaFromNow = fechaObj.fromNow();
					$scope.todos[i].Fecha_time = fechaObj.format("DD/MM/YYYY HH:mm");
				}

				$scope.trayectos = $scope.todos;
			}
		});	
	}

	$scope.FiltrarTrayectos = function () {
		

		if ($scope.form.$valid) {
			var filtrados = _.filter($scope.todos, function(tra){ 
				/*var f = $scope.fecha_salida.split("/");
				var h = $scope.hora_salida.split(":");
				var fecha_hora = new Date(f[2], f[1], f[0], h[0], h[1], 0, 0); */

				var fyh = tra.Fecha_time;
				var aux = fyh.split(" ");
				var fecha = aux[0];
				var hora = aux[1];
	
				return (tra.Origen.toUpperCase() == $scope.salida.toUpperCase())&&(tra.Destino.toUpperCase() == $scope.destino.toUpperCase())&&(fecha == $scope.fecha_salida)&&(hora == $scope.hora_salida)&&(tra.Restricciones.no_fumadores == $scope.noFumadores)&&(tra.Restricciones.no_animales == $scope.noAnimales)&&(tra.Restricciones.no_comida == $scope.noComida)&&(tra.Max_tamanyo_equipaje == $scope.equipaje);
			});

			$scope.trayectos = filtrados;
			
		} else{
			$scope.form.submitted = true;
		}

	};

	$scope.EliminarRest = function(){
		$scope.trayectos = $scope.todos;
		$scope.fecha_salida = "";
		$scope.hora_salida = "";
	};

}
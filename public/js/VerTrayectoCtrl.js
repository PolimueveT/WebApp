function VerTrayectoCtrl($scope, $http) {

	$scope.trayecto = {};
	$scope.current_user = "";
	$scope.unido_trayecto = false;
	$scope.avisos = [];

	$scope.getUnidoATrayecto = function (){
		$http.get('/api/isuserintrip/' + $scope.trayecto._id + '/' + $scope.current_user).success(function(result){
			console.log(result);
		});
	};

	$scope.getTrayecto = function(id){
		$http.get('/api/gettrip/' + id).success(function(result){
			console.log(result);
			if (result !== undefined && result.data.length > 0) {
				var obj = result.data[0];

				var fechaObj = moment(obj.Fecha_time);
				obj.Fecha_time = fechaObj.format("DD/MM/YYYY") + " (" + fechaObj.fromNow() + ")" ;
				obj.hora_salida = fechaObj.format("hh:mm a");

				$scope.trayecto = obj;

				$scope.getUnidoATrayecto();
			};
		});
	};

	$scope.unirmeTrayecto = function () {
		var data = {
			tripId: $scope.trayecto._id,
			personId: $scope.current_user
		};

		$http.put('/api/applytrip', data).success(function(result){
			var obj = {
				clase: [],
				texto: ''
			};

			if(result.success == false){
				obj.clase = ['alert-danger'];
			}else{
				obj.clase = ['alert-success'];
				$scope.unido_trayecto = true;
			}

			obj.texto = result.info;

			$scope.avisos.push(obj);
		});
	};

	$scope.salirTrayecto = function () {
		var data = {
			tripId: $scope.trayecto._id,
			personId: $scope.current_user
		};

		$http.put('/api/cancelPassenger', data).success(function(result){
			$scope.avisos.push(data.info);

			$scope.unido_trayecto = false;
		});
	};

}
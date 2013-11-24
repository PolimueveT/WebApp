function VerTrayectoCtrl($scope, $http) {

	$scope.trayecto = {};
	$scope.current_user = "";

	$scope.getTrayecto = function(id){
		$http.get('/api/gettrip/' + id).success(function(result){
			console.log(result);
			if (result !== undefined && result.data.length > 0) {
				var obj = result.data[0];

				var fechaObj = moment(obj.Fecha_time);
				obj.Fecha_time = fechaObj.format("DD/MM/YYYY") + " (" + fechaObj.fromNow() + ")" ;
				obj.hora_salida = fechaObj.format("hh:mm a");

				$scope.trayecto = obj;
			};
		});
	};

	$scope.unirmeTrayecto = function () {
		var data = {
			tripId: $scope.trayecto._id,
			personId: $scope.current_user
		};

		$http.put('/api/applytrip', data).success(function(result){
			console.log(result);
		});
	};

	$scope.salirTrayecto = function () {
		$http.put('/api/cancelPassenger', data).success(function(result){

		});
	};

}
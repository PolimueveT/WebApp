var MisTrayectosCtrl = function($scope, $http){

	$scope.trayectos_inscrito = [];
	$scope.trayectos_ofreciendo = [];
	$scope.id_user = '';

	$scope.getData = function(){
		$http.get('/api/getpersontrips/' + $scope.id_user).success(function (result){
			console.log(result);
			if(result !== undefined){
				$scope.trayectos_ofreciendo = [];
				for (var i = 0; i < result.data.length; i++) {
					var obj = result.data[i]
					var fechaObj = moment(obj.Fecha_time);
					obj.fechaFormat = fechaObj.fromNow();
					obj.fechaHoraSalida = fechaObj.format("DD-MM-YYYY h:mm:ss a");

					$scope.trayectos_ofreciendo.push(obj);
				};
			}
		});	
	}

	$scope.getInscritos = function(){
		$http.get('/api/getinscritotrips/' + $scope.id_user).success(function (result){
			console.log(result);
			if(result !== undefined){
				$scope.trayectos_ofreciendo = [];
				for (var i = 0; i < result.data.length; i++) {
					var obj = result.data[i]
					var fechaObj = moment(obj.Fecha_time);
					obj.fechaFormat = fechaObj.fromNow();
					obj.fechaHoraSalida = fechaObj.format("DD-MM-YYYY h:mm:ss a");

					$scope.trayectos_ofreciendo.push(obj);
				};
			}
		});	
	}

}
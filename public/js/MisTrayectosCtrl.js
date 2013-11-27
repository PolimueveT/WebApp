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
					var obj = result.data[i];
					var fechaObj = moment(obj.Fecha_time);
					obj.fechaFormat = fechaObj.fromNow();
					obj.fechaHoraSalida = fechaObj.format("DD-MM-YYYY h:mm:ss a");
					obj.id = obj._id;

					$scope.trayectos_ofreciendo.push(obj);
				};
			}
		});	
	}

	$scope.getInscritos = function(){
		$http.get('/api/getinscritotrips/' + $scope.id_user).success(function (result){
			console.log(result);
			if(result !== undefined){
				$scope.trayectos_inscrito = [];
				for (var i = 0; i < result.data.length; i++) {
					var obj = result.data[i];
					var fechaObj = moment(obj.Fecha_time);
					obj.fechaFormat = fechaObj.fromNow();
					obj.fechaHoraSalida = fechaObj.format("DD-MM-YYYY h:mm:ss a");
					obj.id = obj._id;

					$scope.trayectos_inscrito.push(obj);
				};
			}
		});	
	}

	$scope.borrarTrayecto = function(id) {
		if(confirm('Seguro que desea eliminar el trayecto?')){
			$http.delete('/api/deletetrip/' + id).success(function(result){
				var trayecto = _.find($scope.trayectos_ofreciendo, function(r){
					return r.id === id;
				});

				var index = $scope.trayectos_ofreciendo.indexOf(trayecto);
				$scope.trayectos_ofreciendo.splice(index,1);

				// Trayectos Inscritos
				var trayecto = _.find($scope.trayectos_inscrito, function(r){
					return r.id === id;
				});

				var index = $scope.trayectos_inscrito.indexOf(trayecto);
				$scope.trayectos_inscrito.splice(index,1);
			});
		}
	};

}
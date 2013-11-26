function VerTrayectoCtrl($scope, $http) {

	$scope.trayecto = {};
	$scope.current_user = "";
	$scope.unido_trayecto = false;
	$scope.avisos = [];

	$scope.getUnidoATrayecto = function (){
		$http.get('/api/isuserintrip/' + $scope.current_user + '/' + $scope.trayecto._id ).success(function(result){
			console.log(result);
			$scope.unido_trayecto = result.data;
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
				if(obj.Inscritos === undefined){
					obj.Inscritos = [];
				}
				obj.libres = obj.Num_plazas - obj.Inscritos.length;

				if(obj.Restricciones === undefined || _.isEmpty(obj.Restricciones))
				{
					obj.Restricciones = {
						Ninguna: true
					};	
				}

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
				$scope.trayecto.libres--;
			}

			obj.texto = result.info;

			$scope.avisos = [];
			$scope.avisos.push(obj);
		});
	};

	$scope.salirTrayecto = function () {
		var data = {
			tripId: $scope.trayecto._id,
			personId: $scope.current_user
		};

		$http.put('/api/cancelPassenger', data).success(function(result){
			var obj = {
				clase: [],
				texto: ''
			};

			if(result.success == false){
				obj.clase = ['alert-danger'];
			}else{
				obj.clase = ['alert-success'];
				$scope.trayecto.libres++;
				$scope.unido_trayecto = false;
			}

			obj.texto = result.info;
				
			$scope.avisos = [];	
			$scope.avisos.push(obj);	
		});
	};

}
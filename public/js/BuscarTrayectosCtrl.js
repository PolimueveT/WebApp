var BuscarTrayectosCtrl = function($scope, $http){

	$scope.trayectos = [];
	$scope.submitted = false;
	$scope.todos = [];
	$scope.hora_salida = 'Mañana';
	$scope.equipaje = 'Mochila';
	$scope.favoritos = [];

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

			var obj =  getFiltros();

			/*var filtrados = _.filter($scope.todos, function(tra){ 

				var fyh = tra.Fecha_time;
				var aux = fyh.split(" ");
				var fecha = aux[0];
				var hora = aux[1];
	
				return (tra.Origen.toUpperCase() == $scope.salida.toUpperCase())&&(tra.Destino.toUpperCase() == $scope.destino.toUpperCase())&&(fecha == $scope.fecha_salida)&&(hora == $scope.hora_salida)&&(tra.Restricciones.no_fumadores == $scope.noFumadores)&&(tra.Restricciones.no_animales == $scope.noAnimales)&&(tra.Restricciones.no_comida == $scope.noComida)&&(tra.Max_tamanyo_equipaje == $scope.equipaje);
			});

			$scope.trayectos = filtrados;*/

			var filtrados;

			$http.post('/api/getfilteredtrips', obj).success(function (result){
				console.log(result);
				if(result.success === true) { 
					filtrados = result.data;
					for (var i = 0; i<filtrados.length; ++i){
						var fyh = filtrados[i].Fecha_time;
						var fechaObj = moment(fyh);

						filtrados[i].id = filtrados[i]._id;
						filtrados[i].FechaFromNow = fechaObj.fromNow();
						filtrados[i].Fecha_time = fechaObj.format("DD/MM/YYYY HH:mm");
					}
					$scope.trayectos = filtrados;
				}
			});
			
		} else{
			$scope.form.submitted = true;
		}

	};

	$scope.EliminarRest = function(){
		$scope.trayectos = $scope.todos;
		$scope.fecha_salida = "";
		$scope.hora_salida = "";
	};

	$scope.getFavoritos = function() {
		if($scope.id_user.length > 5){
			$http.get('/api/getfavoritefilters/' + $scope.id_user)
				.success(function(result){
					if(result != undefined){
						if(result.success === true){
							$scope.favoritos = result.data;
						}
					}
				});
		}
	}

	$scope.AddFavorito = function (iduser) {

		var data = {
			iduser: $scope.id_user,
			filter: getFiltros()
		};

		$http.put('/api/addfavoritefilter', data).success(function (result){
			console.log(result);
			if(result !== undefined){
				alert(result.info);
				$scope.favoritos.push(data.filter);
			}
		});

	}

	$scope.ColocarFiltro = function (f) {
		$scope.salida = f.Origen;
		$scope.destino = f.Destino;
		$scope.noFumadores = f.Restricciones.no_fumadores;
		$scope.noAnimales = f.Restricciones.no_animales;
		$scope.noComida = f.Restricciones.no_comida;
		$scope.fecha_salida = f.Fecha;
		$scope.hora_salida = getHora(f.Hora);
		$scope.equipaje = obj.Max_tamanyo_equipaje;
	}

	var getHora = function (h){
		if(h == 'M'){
			return 'Mañana';
		}else{
			return 'Tarde';
		}
	}

	var getFiltros = function () {
		var obj = {
			Origen: null,
			Destino: null,
			Restricciones: { 
				no_fumadores: null,
				no_animales: null,
				no_comida: null
			},
			Fecha: null,
			Hora:null,
			Max_tamanyo_equipaje: null
		};

		obj.Origen = $scope.salida;
		obj.Destino = $scope.destino;
		obj.Restricciones.no_fumadores = $scope.noFumadores;
		obj.Restricciones.no_animales = $scope.noAnimales;
		obj.Restricciones.no_comida = $scope.noComida;
		obj.Fecha = $scope.fecha_salida;
		obj.Hora = $scope.hora_salida.substring(0,1);
		obj.Max_tamanyo_equipaje = $scope.equipaje;

		return obj;
	}

}
function CrearUsuarioCtrl($scope, $http) {

	$scope.alertas = [];
	$scope.usertype = 'Alumno';

	$scope.RegistrarUsuario = function () {
		var obj = { 
			nombre: $scope.nombre,
			pass: $scope.password,
			email: $scope.email,
			passconf: $scope.password2,
			usertype: $scope.usertype
		};

		// Enviamos obj con un POST al server
		// Por AJAX.
		$scope.alertas = [];
		$http.post('/api/newuser', obj).success(function (response){
			console.log(response);
			if(response !== undefined) { 
				$scope.alertas.push(response);
				limpiarCampos();
			}
		});
	};

	var limpiarCampos = function(){
		$scope.nombre = "";
		$scope.password = "";
		$scope.email = "";
		$scope.password2 = "";
	}

	$scope.Ingresar = function () {
		var obj = { 
			nombre: $scope.nombre,
			password: $scope.nombre,
		};

		///$scope.obj ??

		console.log(obj);

		// Enviamos obj con un POST al server
		// Por AJAX.
		$http.post('/login', obj).success(function (response){
			console.log(response);
			/*if(response.success === true) { 
				window.location = "/cuenta";	
			}*/
		});
	};

}


$('button').on('click', function(e){
	e.preventDefault();
});
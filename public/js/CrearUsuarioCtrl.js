function CrearUsuarioCtrl($scope, $http) {

	$scope.RegistrarUsuario = function () {
		var obj = { 
			nombre: $scope.nombre,
			pass: $scope.password,
			email: $scope.email,
			passconf: $scope.password2,
		};

		console.log(obj);
		if(obj.password !== obj.password2) {
			alert('Las contraseñas deben coincidir');
		}
		else {
			// Enviamos obj con un POST al server
			// Por AJAX.
			$http.post('/api/newuser', obj).success(function (response){
				console.log(response);
				if(response.success === true) { 
						
				}
			});
		}
	};

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
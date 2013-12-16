function UsuarioCtrl($scope, $http) {

	$scope.alertas = [];
	$scope.usertype = 'Alumno';
	$scope.usuarios = [];

	$scope.getData = function () {
		$http.get('/api/getusers').success(function (result){
			console.log(result);
			if(result !== undefined){
				$scope.usuarios = result.data;
				for (var i = 0; i < result.data.length; i++) {
					$scope.usuarios[i].id = result.data[i]._id;
				};
			}
		});	
	}

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

	$scope.EditarUser = function () {
		if ($scope.form.$valid) {
			
			$http.put('/api/updateuser', $scope.usuario).success(function (response){
				console.log(response);
				
			});

		}else{
			$scope.form.submitted = true;
		}
	}

	$scope.getUsuario = function(id){
		$http.get('/api/getuser/' + id).success(function (response){
			console.log(response);
			var usrObj = {};
			if(response !== undefined) { 
				var data = response.data[0];
				for (var k in data) {
			        usrObj[k.toLowerCase()] = data[k];
			    }

				usrObj.id = data._id;
			    $scope.usuario = usrObj;
			}
		});
	}

}


$('button').on('click', function(e){
	e.preventDefault();
});
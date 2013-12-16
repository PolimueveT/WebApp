function UsuariosCtrl($scope, $http) {

	$scope.usuarios = [];

	$scope.getData = function () {
		$http.get('/api/getusers').success(function (result){
			console.log(result);
			if(result !== undefined){
				$scope.usuarios = result.data;
			}
		});	
	}

}
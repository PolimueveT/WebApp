var MisTrayectosCtrl = function($scope, $http){

	$scope.trayectos_inscrito = [];
	$scope.trayectos_ofreciendo = [];
	$scope.id_user = '';

	$scope.getData = function(){
		$http.get('/api/getpersontrips/' + $scope.id_user).success(function (result){
			console.log(result);
			if(result !== undefined){
				$scope.trayectos_ofreciendo = result.data;
			}
		});	
	}

}
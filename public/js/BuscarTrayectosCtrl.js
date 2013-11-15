var BuscarTrayectosCtrl = function($scope, $http){

	$scope.trayectos [];

	$scope.getData = function(){
		$http.get('/api/gettrips').success(function (result){
			if(result !== undefined){
				$scope.trayectos = result.data;
			}
		});	
	}

}
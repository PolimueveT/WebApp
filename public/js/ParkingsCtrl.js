function ParkingsCtrl($scope, $http) {

	$scope.setParkings = function (parkings){
		$scope.todos_parkings = parkings;
	}

	$scope.getParkings = function () {
		$http.get('/api/parking').success(function (result){
			console.log(result);
			if(result !== undefined){
				$scope.todos_parkings = result;
			}
		});	
	}

}
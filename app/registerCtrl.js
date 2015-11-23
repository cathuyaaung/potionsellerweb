appControllers.controller('registerCtrl', 
	['$scope',
	function($scope){

	$scope.registered = false;

	$scope.register = function(){
		$scope.registered = true;
	};

}]);
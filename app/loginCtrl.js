appControllers.controller('loginCtrl', 
	['$scope', '$location', '$state',
	function($scope, $location, $state){

	$scope.login = function(){
		$location.path('/main');
	};

}]);
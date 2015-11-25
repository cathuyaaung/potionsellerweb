appControllers.controller('navCtrl', 
	['$state', '$scope', '$location', '$localStorage',
	function($state, $scope, $location, $localStorage){

	$scope.$state = $state;

	$scope.showNavBar = true;

	$scope.signout = function(){
		delete $localStorage.token;
		$location.path('/login');
	};

}]);
appControllers.controller('adminCtrl', 
	['$scope', 'User', '$localStorage', '$state',
	function($scope, User, $localStorage, $state){

	if($localStorage.user.role != 'ADMIN'){
		$state.go('app.main');
	}

	$scope.users = User.getall();

}]);
appControllers.controller('logoutCtrl', 
	['$scope', '$location', '$state', 'Login', '$localStorage',
	function($scope, $location, $state, Login, $localStorage){

		delete $localStorage.token;
		delete $localStorage.user;


		$state.go('login');

}]);
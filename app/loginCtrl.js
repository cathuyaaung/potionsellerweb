appControllers.controller('loginCtrl', 
	['$scope', '$location', '$state', 'User', '$localStorage',
	function($scope, $location, $state, User, $localStorage){

	$scope.user = {};

	$scope.login = function(){
		
		User.create({action: 'login'}, $scope.user, function(response){
			$location.path('/main');
			$localStorage.token = response.token;
		}, function(error){
			console.log(error);
		});

	};

}]);
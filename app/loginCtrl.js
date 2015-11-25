appControllers.controller('loginCtrl', 
	['$scope', '$location', '$state', 'User', '$localStorage',
	function($scope, $location, $state, User, $localStorage){

	$scope.user = {};

	$scope.login = function(){
		
		User.create({action: 'login'}, $scope.user, function(response){
			$location.path('/main');
			console.log(response);
			$localStorage.token = response.token;
			$localStorage.username = response.data.username;
			$localStorage.company = response.data.company;

			console.log($localStorage);
		}, function(error){
			console.log(error);
		});

	};

}]);
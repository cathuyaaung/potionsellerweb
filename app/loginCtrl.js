appControllers.controller('loginCtrl', 
	['$scope', '$location', '$state', 'Login', '$localStorage',
	function($scope, $location, $state, Login, $localStorage){

	$scope.user = {};

	$scope.login = function(){
		
		Login.create({}, $scope.user, function(response){
			console.log(response.data);
			if(response.success){
				
				delete $localStorage.token;
				delete $localStorage.user;

				$localStorage.token = response.token;
				$localStorage.user = response.data;

				console.log($localStorage.user);

				$state.go('app.main');
				
			}else{
				$scope.error = "login unsuccessful"
			}
		}, function(error){
			console.log(error);
			$scope.error = error.data;
		});

	};

}]);
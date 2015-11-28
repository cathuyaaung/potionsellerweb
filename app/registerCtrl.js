appControllers.controller('registerCtrl', 
	['$scope', 'Register', '$state', '$localStorage', '$state',
	function($scope, Register, $state, $localStorage, $state){

	$scope.registered = false;
	$scope.user = {};
	$scope.user.companycode = '';
	$scope.user.username = '';
	$scope.user.tier = $localStorage.tier || 1;

	$scope.$watch('user.companycode', function(){
		if($scope.user.companycode){
			$scope.user.companycode = $scope.user.companycode.toLowerCase().replace(/[^a-zA-Z\d.@-_]/,'');	
		}
	});


	$scope.$watch('user.username', function(){
		if($scope.user.username){
			$scope.user.username = $scope.user.username.toLowerCase().replace(/[\s]/,'');
		}
	});

	$scope.trial = function(tier){
		$localStorage.tier = tier;
		$state.go('register');
	};


	$scope.register = function(){
		console.log($scope.user);
		Register.create({}, $scope.user, function(response){
			// console.log(response);

			delete $localStorage.token;
			delete $localStorage.user;

			$localStorage.token = response.token;
			$localStorage.user = response.data;

			// userService.token = response.token;
			// userService.user = response.data;

			console.log($localStorage);

			if(response.success){
				$state.go('app.main');
			}
		}, function(error){
			console.log(error);
			console.log(error.data);
			$scope.error = error.data;
		});

	};

}]);
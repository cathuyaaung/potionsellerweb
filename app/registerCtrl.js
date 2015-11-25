appControllers.controller('registerCtrl', 
	['$scope', 'User', '$location',
	function($scope, User, $location){

	$scope.registered = false;
	$scope.user = {};

	$scope.register = function(){
		User.create({action: 'register'}, $scope.user, function(response){
			console.log(response);
			if(response._id){
				$location.path('/main');
			}
		}, function(error){
			console.log(error);
		});

	};

}]);
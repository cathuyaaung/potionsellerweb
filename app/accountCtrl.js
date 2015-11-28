appControllers.controller('accountCtrl', 
['$scope', 'User', '$state',
function($scope, User, $state){

	User.getone({action: 'getaccountdetails'}, function(response){
		if(response.success){
			console.log(response);
			$scope.user = response.data;
		} else {
			$state.go('logout');
		}
	}, function(error){
		console.log(error);
		$state.go('logout');
	});

	

}]);






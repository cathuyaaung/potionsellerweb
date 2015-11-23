appControllers.controller('navCtrl', 
	['$state', '$scope',
	function($state, $scope){

	$scope.$state = $state;

	$scope.showNavBar = true;

	console.log($scope.$state.current.name);
	// console.log($state.current.includes('sell'));
	// if($state.includes('mainmenu')){
	// 	showNavBar = true;
	// } else {
	// 	showNavBar = false;
	// }

}]);
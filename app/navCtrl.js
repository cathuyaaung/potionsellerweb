appControllers.controller('navCtrl', 
	['$state', '$scope', '$location', '$localStorage', '$rootScope',
	function($state, $scope, $location, $localStorage, $rootScope){

	$scope.$state = $state;

	console.log($localStorage.user);

	if($localStorage.user){
		$scope.companycode = $localStorage.user.company.code;
		$scope.tier = $localStorage.user.company.tier;
		$scope.username = $localStorage.user.username;
		$scope.role = $localStorage.user.role;
	}

	console.log($state.current.name);
	    switch($state.current.name){
		case 'app.main':
			$scope.title = 'Main Menu';
			break;
		case 'app.sell':
			$scope.title = 'Sell';
			break;
		case 'app.buy':
			$scope.title = 'Buy';
			break;
		case 'app.items':
			$scope.title = 'Items';
			break;
		case 'app.suppliers':
			$scope.title = 'Suppliers';
			break;
		case 'app.customers':
			$scope.title = 'Customers';
			break;
		case 'app.sales':
			$scope.title = 'Sales';
			break;
		case 'app.purchases':
			$scope.title = 'Purchases';
			break;

		case 'app.account':
			$scope.title = 'Account';
			break;
		default:
			$scope.title = '';
			break;

		}


	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
	    switch(toState.name || $state.current.name){
		case 'app.main':
			$scope.title = 'Main Menu';
			break;
		case 'app.sell':
			$scope.title = 'Sell';
			break;
		case 'app.buy':
			$scope.title = 'Buy';
			break;
		case 'app.items':
			$scope.title = 'Items';
			break;
		case 'app.suppliers':
			$scope.title = 'Suppliers';
			break;
		case 'app.customers':
			$scope.title = 'Customers';
			break;
		case 'app.sales':
			$scope.title = 'Sales';
			break;
		case 'app.purchases':
			$scope.title = 'Purchases';
			break;

		case 'app.account':
			$scope.title = 'Account';
			break;
		default:
			$scope.title = '';
			break;

		}
	});





	$scope.signout = function(){
		delete $localStorage.token;
		delete $localStorage.user;
		$state.go('login');
	};

}]);
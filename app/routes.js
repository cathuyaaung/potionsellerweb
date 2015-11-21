app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider){

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	
	$urlRouterProvider.otherwise("/");


	$stateProvider
	.state('items', {
		url: '/items',
		templateUrl: '/views/itemsView.html',
		controller: 'itemCtrl'
	})
	.state('suppliers', {
		url: '/suppliers',
		templateUrl: '/views/suppliersView.html',
		controller: 'supplierCtrl'
	})
	.state('customers', {
		url: '/customers',
		templateUrl: '/views/customersView.html',
		controller: 'customerCtrl'
	})
	.state('buy', {
		url: '/buy',
		templateUrl: '/views/buyView.html',
		controller: 'buyCtrl'
	})
	.state('sell', {
		url: '/sell',
		templateUrl: '/views/sellView.html',
		controller: 'sellCtrl'
	})



	;



}]);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider){

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	
	$urlRouterProvider.otherwise("/");


	$stateProvider
	.state('landing', {
		url: '/',
		templateUrl: '/views/landingView.html',
		controller: 'mainCtrl'
	})
	.state('pricing', {
		url: '/pricing',
		templateUrl: '/views/pricingView.html',
		controller: 'mainCtrl'
	})
	.state('register', {
		url: '/register',
		templateUrl: '/views/registerView.html',
		controller: 'registerCtrl'
	})
	.state('login', {
		url: '/login',
		templateUrl: '/views/loginView.html',
		controller: 'loginCtrl'
	})			
	.state('mainmenu', {
		url: '/main',
		templateUrl: '/views/mainView.html',
		controller: 'mainCtrl'
	})	
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
	.state('buy_YG', {
		url: '/buy_YG',
		templateUrl: '/views/buyView_YG.html',
		controller: 'buyCtrl_YG'
	})
	.state('purchaseOrder', {
		url: '/purchaseOrder',
		templateUrl: '/views/purchaseOrderView.html',
		controller: 'purchaseOrderCtrl'
	})

	// .state('purchaseorders', {
	// 	url: '/po',
	// 	templateUrl, """
	// })


	;



}]);
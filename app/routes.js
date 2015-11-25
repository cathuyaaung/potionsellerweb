app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	

    $httpProvider.interceptors.push('authInterceptor');
    // $httpProvider.defaults.headers.common = {
    //     'RemoteUser': 'billybob'
    // };


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
		controller: 'mainCtrl',
		data: {
			requireLogin: true
		}
	})	
	.state('items', {
		url: '/items',
		templateUrl: '/views/itemsView.html',
		controller: 'itemCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('suppliers', {
		url: '/suppliers',
		templateUrl: '/views/suppliersView.html',
		controller: 'supplierCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('customers', {
		url: '/customers',
		templateUrl: '/views/customersView.html',
		controller: 'customerCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('buy', {
		url: '/buy',
		templateUrl: '/views/buyView.html',
		controller: 'buyCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('sell', {
		url: '/sell',
		templateUrl: '/views/sellView.html',
		controller: 'sellCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('buy_YG', {
		url: '/buy_YG',
		templateUrl: '/views/buyView_YG.html',
		controller: 'buyCtrl_YG',
		data: {
			requireLogin: true
		}
	})
	.state('purchaseOrder', {
		url: '/purchaseOrder',
		templateUrl: '/views/purchaseOrderView.html',
		controller: 'purchaseOrderCtrl',
		data: {
			requireLogin: true
		}
	})

	// .state('purchaseorders', {
	// 	url: '/po',
	// 	templateUrl, """
	// })


	;



}]);
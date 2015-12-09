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


	// $urlRouterProvider.otherwise("/");


	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/views/landingView.html',
		controller: 'mainCtrl'
	})
	.state('pricing', {
		url: '/pricing',
		templateUrl: '/views/pricingView.html',
		controller: 'registerCtrl'
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
	.state('logout', {
		url: '/logout',
		templateUrl: '/views/loginView.html',
		controller: 'logoutCtrl'
	})



	.state('app', {
		url: '/app',
		templateUrl: '/views/app.html',
		controller: 'webappCtrl'
	})		

	.state('app.main', {
		url: '/main',
		templateUrl: '/views/mainView.html',
		controller: 'mainCtrl'
	})		

	.state('app.suppliers', {
		url: '/suppliers',
		templateUrl: '/views/suppliersView.html',
		controller: 'supplierCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('app.customers', {
		url: '/customers',
		templateUrl: '/views/customersView.html',
		controller: 'customerCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('app.buy', {
		url: '/buy',
		templateUrl: '/views/buyView_YG.html',
		controller: 'buyCtrl_YG',
		data: {
			requireLogin: true
		}
	})
	.state('app.sell', {
		url: '/sell',
		templateUrl: '/views/sellView.html',
		controller: 'sellCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('app.purchases', {
		url: '/purchaseOrder',
		templateUrl: '/views/purchaseOrderView.html',
		controller: 'purchaseOrderCtrl',
		data: {
			requireLogin: true
		}
	})

	.state('app.sales', {
		url: '/sales',
		templateUrl: '/views/salesView.html',
		controller: 'salesCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('app.account', {
		url: '/account',
		templateUrl: '/views/accountView.html',
		controller: 'accountCtrl',
		data: {
			requireLogin: true
		}
	})
	.state('app.items', {
		url: '/items',
		templateUrl: '/views/itemsView_YG.html',
		controller: 'itemCtrl_YG',
		data: {
			requireLogin: true
		}
	})
	/*
	.state('app.items_YG', {
		url: '/items_YG',
		templateUrl: '/views/itemsView_YG.html',
		controller: 'itemCtrl_YG',
		data: {
			requireLogin: true
		}
	})
	*/

	.state('app.admin', {
		url: '/admin',
		templateUrl: '/views/admin.html',
		controller: 'adminCtrl',
		data: {
			requiredLogin: true
		}
	})
	;



}]);
app.config([
	'$routeProvider', function
	($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/app/views/main.html',
		controller: 'mainCtrl'
	})
	.when('/categories', {
		templateUrl: '/app/views/category.html',
		controller: 'categoryCtrl'
	})
	.when('/items', {
		templateUrl: '/app/views/item.html',
		controller: 'itemCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

}]);
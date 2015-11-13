app.config([
	'$routeProvider', function
	($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/app/views/main.html',
		controller: 'mainCtrl'
	})

	.when('/categories', {
		templateUrl: '/app/views/categories.html',
		controller: 'categoriesCtrl'
	})
	.when('/addcategory', {
		templateUrl: '/app/views/addcategory.html',
		controller: 'addCategoryCtrl'
	})
	.when('/updatecategory', {
		templateUrl: '/app/views/updatecategory.html',
		controller: 'updateCategoryCtrl'
	})

	.when('/category/:categoryid', {
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
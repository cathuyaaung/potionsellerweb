
appControllers.controller('addCategoryCtrl', [
	'$scope', '$location', 'Category', function
	($scope, $location, Category){

	$scope.category = {};
	$scope.title = 'Add Category Controller';

	$scope.addcategory = function(){		
		Category.save($scope.category, 
			function(){
				$location.path('/categories');	
			}, function(){
				console.log('addcategory failed');
			});
	};

	$scope.cancel = function(){
		$location.path('/categories');
	}
	
}]);
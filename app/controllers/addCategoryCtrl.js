
appControllers.controller('addCategoryCtrl', [
	'$scope', '$location', '$http','Category', function
	($scope, $location, $http, Category){

	$scope.category = {};
	$scope.title = 'Add Category Controller';

	$scope.addcategory = function(){		
		Category.save($scope.category, 
			function(response){				
				$scope.category = response.category;
				console.log($scope.category);
				$location.path('/categories');	
			}, function(error){
				console.log('addcategory failed');
			});
	};

	$scope.cancel = function(){
		$location.path('/categories');
	}
	
}]);
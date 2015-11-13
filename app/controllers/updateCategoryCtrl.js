
appControllers.controller('updateCategoryCtrl', [
	'$scope', '$location', 'Category', 'CategoryService', function
	($scope, $location, Category, CategoryService){

	$scope.category = CategoryService.getCategory();

	if (_.isEmpty($scope.category)) {
		$location.path('/categories');
	}

	$scope.updatecategory = function(){	
		Category.update({ categoryid: $scope.category._id }, $scope.category, function(){
			$location.path('/categories');
		});
	};

	$scope.cancel = function(){
		$location.path('/categories');
	}
	
}]);
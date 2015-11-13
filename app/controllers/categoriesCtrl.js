
appControllers.controller('categoriesCtrl', [
	'$scope', '$location', 'Category', 'CategoryService', function
	($scope, $location, Category, CategoryService){

	$scope.categories = Category.query();

	$scope.removecategory = function(category){
		Category.delete({}, {'categoryid': category._id}, function(){
			$scope.categories = Category.query();			
		});
	}

	$scope.updatecategory = function(category){
		CategoryService.setCategory(category);
		$location.path('/updatecategory');
	};

	$scope.selectcategory = function(category){
		CategoryService.setCategory(category);
		$location.path('/category/'+category._id);
	};

}]);
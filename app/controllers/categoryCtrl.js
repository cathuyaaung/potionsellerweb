
appControllers.controller('categoryCtrl', [
	'$scope', '$location','$routeParams', 'Category', function
	($scope, $location, $routeParams, Category) {

	if (_.isEmpty($routeParams.categoryid)) {
		$location.path('/categories');
	}


	Category.get({categoryid:$routeParams.categoryid}, function(category){
		console.log(category);
		$scope.category = category;
	});
	// $scope.categories = Category.query();

	// $scope.removecategory = function(category){
	// 	Category.delete({}, {'categoryid': category._id}, function(){
	// 		$scope.categories = Category.query();			
	// 	});
	// }

	// $scope.updatecategory = function(category){
	// 	CategoryService.setCategory(category);
	// 	$location.path('/updatecategory');
	// };

	// $scope.selectcategory = function(category){
	// 	CategoryService.setCategory(category);
	// 	$location.path('/category/'+category._id);
	// };

}]);
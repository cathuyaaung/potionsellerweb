
appControllers.controller('itemCtrl_YG', 
	['$scope', '$uibModal', 'Category', 'Item', function
	($scope, $uibModal, Category, Item){

	$scope.selectedcategory = {};
	
	$scope.choosecategory = function(category){
		
		var selectcategoryMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/choosecategoryModal.html',
			controller: 'choosecategoryModalCtrl'
		});
		selectcategoryMI.result.then(function(category){
			
			Category.getone({categoryid: category._id}, category, function(response){
				$scope.selectedcategory = response;
			});	
			$scope.items = Item.getall({categoryid: category._id});
		});

		
		
	};

	$scope.addcategory = function(category){
		Category.create(category, function(response){
			$scope.categories = Category.getall();
			$scope.categorytoadd = {};	
		});
	};
	
	$scope.removecategory = function(category){
		Category.delete({categoryid: category._id}, category,function(response){
			$scope.categories = Category.getall();
		});
	};

	$scope.updatecategory = function(category){
		$scope.categorytoupdate = category;
	};
	$scope.saveupdatedcategory = function(category){
		Category.update({categoryid: category._id}, category, function(response){
			$scope.categorytopudate = {};
			$scope.categories = Category.getall();
		});
	};

	$scope.selecteditem = {};
	$scope.itemtopudate = {};
	$scope.itemtoadd = {}

	$scope.additem = function(item){
		Item.create({categoryid: $scope.selectedcategory._id}, item, function(response){
			console.log(response);
			$scope.items = Item.getall({categoryid:response.item.category._id});
		}, function(error){console.log(error.data.message);});
	};
	$scope.removeitem = function(item){
		Item.delete({
			categoryid: $scope.selectedcategory,
			itemid: item._id
		}, function(response){
			$scope.items = Item.getall({categoryid:$scope.selectedcategory._id});			
		});
	};
	$scope.selectitem = function(item){
		$scope.itemtoupdate = item;
		console.log($scope.itemtoupdate);
	};
	$scope.updateitem = function(item){
		console.log(item);
		Item.update({
			categoryid: $scope.selectedcategory._id,
			itemid: item._id
		}, item, function(response){
			console.log(response);
		}, function(error){
			console.log(error.data);
		});
	};
}]);

appControllers.controller('choosecategoryModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'Category',
	function($scope, $uibModalInstance, $uibModal, Category){
	$scope.title = "Choose Category";
	$scope.categories = Category.getall();
	$scope.selectcategory = function(category) { $uibModalInstance.close(category); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);
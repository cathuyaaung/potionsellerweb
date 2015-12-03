
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


	$scope.additem = function(){
		
		var addNewItemMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/addNewItemModal.html',
			controller: 'addNewItemModalCtrl',
			resolve: {
				selectedcategory: function(){ return angular.copy($scope.selectedcategory) }
			}
		});
		addNewItemMI.result.then(function(selectedcategory){
			console.log(selectedcategory);
			$scope.selectedcategory = selectedcategory;
			$scope.items = Item.getall({categoryid: selectedcategory._id});
		});
	};

	$scope.updateItemDetail = function(item){
		var updateItemDetailMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/updateItemDetailModal.html',
			controller: 'updateItemDetailModalCtrl',
			resolve: {
				itemToUpdate: function(){ return angular.copy(item) }
			}
		});
		updateItemDetailMI.result.then(function(item){
			console.log(item);
			Item.update({
				categoryid: $scope.selectedcategory._id,
				itemid: item._id
			}, item, function(response){
				console.log(response);
				$scope.items = Item.getall({categoryid:$scope.selectedcategory._id});
			}, function(error){
				console.log(error.data);
			});
		});
	};

	$scope.removeitem = function(item){
		var removeItemMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/confirmationModal.html',
			controller: 'deletItemConfirmationCtrl',
			resolve: {
				itemToDelete: function(){ return angular.copy(item) }
			}
		});		
		removeItemMI.result.then(function(item){
			console.log(item);

			Item.delete({
				categoryid: $scope.selectedcategory,
				itemid: item._id
			}, function(response){
				$scope.items = Item.getall({categoryid:$scope.selectedcategory._id});			
			}, function(error){
				console.log(error.data);
			});
		});			
	};

	$scope.selectitem = function(item){
		$scope.itemtoupdate = item;
		console.log($scope.itemtoupdate);
	};
	
}]);

appControllers.controller('choosecategoryModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'Category',
	function($scope, $uibModalInstance, $uibModal, Category){
		$scope.title = "Choose Category";
		$scope.categories = Category.getall();

		$scope.selectcategory = function(category) { 
			$uibModalInstance.close(category); 
		};

		$scope.cancel = function() { 
			$uibModalInstance.dismiss(); 
		};

		$scope.addcategory = function(){

			var addNewCategoryMI = $uibModal.open({
				animation: true,
				templateUrl: '/views/modals/addNewCategoryModal.html',
				controller: 'addNewCategoryModalCtrl'
			});
			addNewCategoryMI.result.then(function(categoryAdded){
				console.log(categoryAdded);
				$scope.categories = Category.getall();
			});

			
		};
		
		$scope.removecategory = function(categoryToDelete){
			var removeCategoryMI = $uibModal.open({
				animation: true,
				templateUrl: '/views/modals/confirmationModal.html',
				controller: 'deletCategoryConfirmationCtrl',
				resolve: {
					categoryToDelete: function(){ return angular.copy(categoryToDelete) }
				}
			});		
			removeCategoryMI.result.then(function(categoryToDelete){
				console.log(categoryToDelete);

				Category.delete({
					categoryid: categoryToDelete._id
				}, categoryToDelete,function(response){
					$scope.categories = Category.getall();
				}, function(error){
					console.log(error.data);
				});
			});	


		};

		$scope.updatecategory = function(categoryToUpdate){
			var updateCategoryDetailMI = $uibModal.open({
				animation: true,
				templateUrl: '/views/modals/updateCategoryDetailModal.html',
				controller: 'updateCategoryDetailModalCtrl',
				resolve: {
					categoryToUpdate: function(){ return angular.copy(categoryToUpdate) }
				}
			});
			updateCategoryDetailMI.result.then(function(categoryToUpdate){
				console.log(categoryToUpdate);

				Category.update({
					categoryid: categoryToUpdate._id
				}, categoryToUpdate, function(response){
					$scope.categories = Category.getall();
				}, function(error){
					console.log(error.data);
				});
			});
		};
	}
]);

appControllers.controller('addNewCategoryModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'Category',
	function($scope, $uibModalInstance, $uibModal, Category){
		$scope.title = "Add New Category";
		$scope.categoryToAdd = {};
		$scope.actionbutton = "Add Category";

		$scope.ok = function(categoryToAdd) { 
			Category.create(categoryToAdd, function(response){
				$scope.categoryToAdd = {};
				$uibModalInstance.close(categoryToAdd); 
			}, function(error){
				console.log(error.data.message);
			});
		};

		$scope.cancel = function() { 
			$uibModalInstance.dismiss(); 
		};
	}
]);

appControllers.controller('updateCategoryDetailModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'categoryToUpdate',
	function($scope, $uibModalInstance, $uibModal, categoryToUpdate){
		$scope.title = "Update Category";
		$scope.categoryToUpdate = categoryToUpdate;
		$scope.actionbutton = "Update Category";
		$scope.ok = function() { $uibModalInstance.close($scope.categoryToUpdate); };
		$scope.cancel = function() { $uibModalInstance.dismiss(); };
	}
]);

appControllers.controller('addNewItemModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'Category', 'Item', 'selectedcategory',
	function($scope, $uibModalInstance, $uibModal, Category, Item, selectedcategory){
		$scope.title = "Add New Item";
		$scope.itemToAdd = {};
		$scope.selectedcategory = selectedcategory;
		$scope.actionbutton = "Add Item";

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
			});		
		};

		$scope.ok = function(itemToAdd) { 
			Item.create({
				categoryid: $scope.selectedcategory._id
			},  itemToAdd, function(response){
				console.log(response);
				$uibModalInstance.close($scope.selectedcategory); 
			}, function(error){
				console.log(error.data.message);
			});
		};

		$scope.cancel = function() { 
			$uibModalInstance.dismiss(); 
		};
	}
]);

appControllers.controller('updateItemDetailModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'itemToUpdate', 'Item',
	function($scope, $uibModalInstance, $uibModal, itemToUpdate, Item){
		$scope.title = "Update Item";
		$scope.itemToUpdate = itemToUpdate;
		$scope.actionbutton = "Update Item";
		$scope.ok = function() { $uibModalInstance.close($scope.itemToUpdate); };
		$scope.cancel = function() { $uibModalInstance.dismiss(); };
	}
]);

appControllers.controller('deletItemConfirmationCtrl', 
['$scope', '$uibModalInstance', '$uibModal', 'itemToDelete',
function($scope, $uibModalInstance, $uibModal, itemToDelete){
	$scope.itemToDelete = itemToDelete;
	$scope.text = "Delete Item?";
	$scope.ok = function() { $uibModalInstance.close($scope.itemToDelete); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);

appControllers.controller('deletCategoryConfirmationCtrl', 
['$scope', '$uibModalInstance', '$uibModal', 'categoryToDelete',
function($scope, $uibModalInstance, $uibModal, categoryToDelete){
	$scope.categoryToDelete = categoryToDelete;
	$scope.text = "Delete Category?";
	$scope.ok = function() { $uibModalInstance.close($scope.categoryToDelete); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);
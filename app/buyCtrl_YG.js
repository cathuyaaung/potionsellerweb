appControllers.controller('buyCtrl_YG', 
['$state', '$scope', '$uibModal', 'PurchaseOrder', 'PurchaseOrderItem',
function($state, $scope, $uibModal, PurchaseOrder, PurchaseOrderItem) {

	$scope.bitems = [];
	var newbitem = {};
	$scope.bitems.push(newbitem);		
	$scope.grandtotal = 0;
	
	$scope.addsupplier = function(){
		var addSupplierMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/chooseSupplierModal.html',
			controller: 'chooseSupplierModalCtrl'
		});
		addSupplierMI.result.then(function(supplier){
			$scope.supplier = supplier;
		});
	}; // choosesupplier()
		
	
	$scope.addrow = function(){
		var newbitem = {};
		$scope.bitems.push(newbitem);
	};
	$scope.clear = function(){
		$scope.bitems = [];
		var newbitem = {};
		$scope.bitems.push(newbitem);
		$scope.grandtotal = 0;
	};
	$scope.additem = function($index){
		var chooseItemMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/chooseItemModal.html',
			controller: 'chooseItemModalCtrl'	
		});
		chooseItemMI.result.then(function(item){
			$scope.bitems[$index].item = item;
			$scope.error = null;
			_.forEach($scope.bitems, function(n, index){
				if(n.item == null || n.item == undefined){
					$scope.error = "Item "+ (index+1) +" is missing"
				}
			});
		});
	};
	$scope.removeitem = function($index){
		$scope.bitems.splice($index, 1);
		$scope.valuechanged($index);
	};
	$scope.valuechanged = function($index){
		if($scope.bitems[$index]) {
			$scope.bitems[$index].total = $scope.bitems[$index].count * $scope.bitems[$index].price;			
		}
		$scope.grandtotal = 0;
		_.forEach($scope.bitems, function(n){
			$scope.grandtotal = $scope.grandtotal + (n.total || 0);
		});
	};

	$scope.done = function(){
		$scope.error = null;
		if($scope.supplier == null) {
			$scope.error = "Supplier is missing";
		}
		_.forEach($scope.bitems, function(n, index){
			if(n.item == null || n.item == undefined){
				$scope.error = "Item "+ (index+1) +" is missing"
			}
		});
		if($scope.error == null){
			var finalizeSaleOrderMI = $uibModal.open({
				animation: true,
				templateUrl: '/views/modals/confirmationModal.html',
				controller: 'finalizePurchaseOrderModalCtrl'
			});
			finalizeSaleOrderMI.result.then(function(){		
				var porder = {
					supplier: $scope.supplier,
					total: $scope.grandtotal,
					remaining: $scope.grandtotal,
					poitems: $scope.bitems
				};
				console.log(porder);
				PurchaseOrder.create(porder, function(response){
					if(response.success){
						$state.go('app.purchases');
					} else {
						console.log(response);
					}
				}, function(error){
					console.log(error);
				});
			});
		}
	};
}]);



// Modal Controllers
// -----------------

appControllers.controller('chooseSupplierModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'Supplier',
	function($scope, $uibModalInstance, $uibModal, Supplier){
	$scope.title = "Choose Supplier";
	$scope.suppliers = Supplier.getall();
	$scope.selectsupplier = function(supplier) { $uibModalInstance.close(supplier); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);

appControllers.controller('chooseItemModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'Category', 'Item',
	function($scope, $uibModalInstance, $uibModal, Category, Item){
	$scope.title = "Choose Category";
	$scope.categories = Category.getall();
	$scope.selectedcategory = null;
	$scope.selectcategory = function(category){
		$scope.selectedcategory = category;
		$scope.title = "Choose Item";
		$scope.items = Item.getall({categoryid: category._id});		
	};
	$scope.back = function(){
		$scope.selectedcategory = null;
		$scope.title = "Choose Category";
		$scope.items = null;		
	};
	$scope.selectitem = function(item) { $uibModalInstance.close(item); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);

appControllers.controller('finalizePurchaseOrderModalCtrl', 
['$scope', '$uibModalInstance', '$uibModal',
function($scope, $uibModalInstance, $uibModal){
	$scope.text = "Create Purchase Order?";
	$scope.ok = function() { $uibModalInstance.close(); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);


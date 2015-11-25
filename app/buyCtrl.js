appControllers.controller('buyCtrl', 
['$scope', '$uibModal', 'PurchaseOrder', 'PurchaseOrderItem',
function($scope, $uibModal, PurchaseOrder, PurchaseOrderItem){

	$scope.addBuyRecordView = false;
	$scope.porders = PurchaseOrder.getall();
	$scope.addPurchaseRecord = function(){
		$scope.addBuyRecordView = true;
	}; // addPurchaseRecord()

	$scope.selectedsupplier = null;
	$scope.choosesupplier = function(){
		var chooseSupplierModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/chooseSupplierModal.html',
			controller: 'chooseSupplierModalCtrl'
		});
		chooseSupplierModalInstance.result.then(function(supplier){
			$scope.selectedsupplier = supplier;
		});
	}; // choosesupplier()
	$scope.removeselectedsupplier = function(){
		$scope.selectedsupplier = null;
	}; // removeselectedsupplier()

	$scope.removeitem = function($index){
		item = {};
		angular.copy(item, $scope.items[$index]);
	}; // removeitem()

	$scope.items = [];
	var item = {};
	$scope.items.push(item);
	$scope.addrow = function(){
		var newItem = {};
		$scope.items.push(newItem);
	};
	$scope.chooseitem = function($index){
		console.log($index);
		var chooseItemModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/chooseItemModal.html',
			controller: 'chooseItemModalCtrl'	
		});
		chooseItemModalInstance.result.then(function(item){
			angular.copy(item, $scope.items[$index]);
		});		
	}; // chooseitem()
	
	$scope.valuechanged = function($index){
		$scope.items[$index].total = $scope.items[$index].count * $scope.items[$index].price;
		$scope.grandtotal = 0;
		for (var i = 0; i < $scope.items.length; i++) {
			$scope.grandtotal = $scope.grandtotal + $scope.items[i].total;
		}
	}; // valuechanged()

	$scope.done = function(){
		if($scope.selectedsupplier != null && $scope.items[0]._id != null){
			var finalizePurchaseOrderModalInstance = $uibModal.open({
				animation: true,
				templateUrl: '/views/modals/confirmationModal.html',
				controller: 'finalizePurchaseOrderModalCtrl'
			});
			finalizePurchaseOrderModalInstance.result.then(function(){				
				var porder = {
					supplier: $scope.selectedsupplier._id,
					total: $scope.grandtotal,
					remaining: $scope.grandtotal
				};
				PurchaseOrder.create(porder, function(response){
					$scope.addBuyRecordView = false;
					$scope.porders = PurchaseOrder.getall();
					console.log(response);
					for (var i=0; i< $scope.items.length; i++){
						var pitem = {
							count: $scope.items[i].count,
							price: $scope.items[i].count,
							item: $scope.items[i]._id,
							purchaseorder: response._id
						};
						PurchaseOrderItem.create({porderid: response._id}, pitem, function(response){
							console.log(response)
						}, function(error){console.log(error)});
					}
				}, function(err){console.log(err);});
			});
		}
	}; // done()

	$scope.back = function(){
		$scope.addBuyRecordView = false;
		$scope.porders = PurchaseOrder.getall();		
	};

	$scope.showOrderDetail = function(porder){
		var orderDetailModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/purchaseOrderDetailModal.html',
			controller: 'purchaseOrderDetailModalCtrl',
			resolve: {
				porder: function(){ return angular.copy(porder) }
			}
		});		
		orderDetailModalInstance.result.then(function(porder){
			if(porder.delete){
				PurchaseOrder.delete({porderid: porder._id}, function(response){
					$scope.porders = PurchaseOrder.getall();
				}, function(err){console.log(err);});
			}
		});		
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

appControllers.controller('purchaseOrderDetailModalCtrl', 
['$scope', '$uibModalInstance', '$uibModal', 'porder', 'PurchaseOrderItem',
function($scope, $uibModalInstance, $uibModal, porder, PurchaseOrderItem){
	$scope.title = "Purchase Order Detail";
	$scope.porder = porder;
	console.log(porder);
	$scope.porderitems = PurchaseOrderItem.getall({porderid:porder._id});
	$scope.ok = function() { $uibModalInstance.dismiss(); };
	$scope.porder.delete = true;
	$scope.delete = function(){
		var deletePOConfirmationMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/confirmationModal.html',
			controller: 'deletePOConfirmationMICtrl'
		});
		deletePOConfirmationMI.result.then(function(){				
			$uibModalInstance.close($scope.porder);
		});
	};
}]);

appControllers.controller('deletePOConfirmationMICtrl', 
['$scope', '$uibModalInstance', '$uibModal',
function($scope, $uibModalInstance, $uibModal){
	$scope.text = "Delete Purchase Order?";
	$scope.ok = function() { $uibModalInstance.close(); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);




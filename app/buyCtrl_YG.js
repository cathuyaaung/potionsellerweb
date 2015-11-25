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
		_.forEach($scope.bitems, function(n, index){
			if(n.item == null || n.item == undefined){
				$scope.error = "Item "+ (index+1) +" is missing"
			}
		});
		if($scope.error == null){
			var finalizeSaleOrderMI = $uibModal.open({
				animation: true,
				templateUrl: '/views/modals/confirmationModal.html',
				controller: 'finalizeSaleOrderModalCtrl'
			});
			finalizeSaleOrderMI.result.then(function(){		
				var supplierid = null;
				if($scope.supplier != null){
					supplierid = $scope.supplier._id;
				}
				var porder = {
					supplier: supplierid,
					total: $scope.grandtotal,
					remaining: $scope.grandtotal
				};
				PurchaseOrder.create(porder, function(response){

					async.each($scope.bitems, function(n, callback){
						var pitem = {
							item: n.item,
							count: n.count,
							price: n.price
						};
						PurchaseOrderItem.create({porderid: response._id}, pitem, function(response){
							console.log(response)
							callback();
						}, function(error){console.log(error)});
					}, function(err){
						$scope.bitems = [];
						$scope.grandtotal = 0;
					});
					$state.go('purchaseOrder');
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

appControllers.controller('finalizeSaleOrderModalCtrl', 
['$scope', '$uibModalInstance', '$uibModal',
function($scope, $uibModalInstance, $uibModal){
	$scope.text = "Create Sale Order?";
	$scope.ok = function() { $uibModalInstance.close(); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);


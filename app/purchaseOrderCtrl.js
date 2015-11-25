appControllers.controller('purchaseOrderCtrl', 
['$scope', '$uibModal', 'PurchaseOrder', 'PurchaseOrderItem',
function($scope, $uibModal, PurchaseOrder, PurchaseOrderItem) {

	$scope.porders = PurchaseOrder.getall();

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
			templateUrl: '/views/modals/confirmationModal.html',
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


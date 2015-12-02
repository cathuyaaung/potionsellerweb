appControllers.controller('purchaseOrderCtrl', 
['$scope', '$uibModal', 'PurchaseOrder',
function($scope, $uibModal, PurchaseOrder) {

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
			$scope.porders = PurchaseOrder.getall();
		});		
	};


}]);



// Modal Controllers
// -----------------

appControllers.controller('purchaseOrderDetailModalCtrl', 
['$scope', '$uibModalInstance', '$uibModal', 'porder', 'PurchaseOrder',
function($scope, $uibModalInstance, $uibModal, porder, PurchaseOrder){
	$scope.title = "Purchase Order Detail";
	$scope.porder = porder;
	// console.log(porder);
	$scope.porderitems = porder.poitems;
	$scope.ok = function() { $uibModalInstance.close(); };
	$scope.porder.delete = false;

	$scope.totalpaid = 0;
	for(var i=0; i<porder.popayments.length; i++){
		 $scope.totalpaid = $scope.totalpaid + porder.popayments[i].amount;
	}

	$scope.delete = function(){
		var deletePOConfirmationMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/confirmationModal.html',
			controller: 'deletePOConfirmationMICtrl'
		});
		deletePOConfirmationMI.result.then(function(){	
			PurchaseOrder.delete({porderid: $scope.porder._id}, function(response){
				$uibModalInstance.close();
			}, function(err){console.log(err);});			
		});
	};
	$scope.addpayment = function(){
		var addPaymentMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/inputModal.html',
			controller: 'addPaymentCtrl',
			size: 'sm'
		});
		addPaymentMI.result.then(function(paymentAmount){
			var payment = { amount: paymentAmount};	
			PurchaseOrder.create({porderid:$scope.porder._id, action:'addpayment'}, payment, function(response){
				if(response.success){
					$scope.porder = response.data;
					$scope.totalpaid = 0;
					for(var i=0; i<$scope.porder.popayments.length; i++){
						 $scope.totalpaid = $scope.totalpaid + $scope.porder.popayments[i].amount;
					}					
				} else {
					console.log(response)
				}
			}, function(error){
				console.log(error);
			});
			// $uibModalInstance.close();
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

appControllers.controller('addPaymentCtrl', 
['$scope', '$uibModalInstance', '$uibModal',
function($scope, $uibModalInstance, $uibModal){

	$scope.ok = function() { $uibModalInstance.close($scope.inputAmount); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);



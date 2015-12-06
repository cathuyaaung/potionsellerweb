appControllers.controller('salesCtrl', 
['$scope', 'SaleOrder', '$uibModal',
function($scope, SaleOrder, $uibModal){

	$scope.sorders = SaleOrder.getall();


	$scope.showOrderDetail = function(sorder){
		var orderDetailModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/saleOrderDetailModal.html',
			controller: 'saleOrderDetailModalCtrl',
			resolve: {
				sorder: function(){ return angular.copy(sorder) }
			}
		});		
		orderDetailModalInstance.result.then(function(sorder){
			$scope.sorders = SaleOrder.getall();
		});		
	};

}]);


appControllers.controller('saleOrderDetailModalCtrl', 
['$scope', '$uibModalInstance', '$uibModal', 'sorder', 'SaleOrder',
function($scope, $uibModalInstance, $uibModal, sorder, SaleOrder){
	$scope.title = "Sale Order Detail";
	$scope.sorder = sorder;
	$scope.ok = function() { $uibModalInstance.close(); };

	$scope.totalpaid = 0;
	for(var i=0; i<sorder.sopayments.length; i++){
		 $scope.totalpaid = $scope.totalpaid + sorder.sopayments[i].amount;
	}


	$scope.delete = function(){
		var deleteSOConfirmationMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/confirmationModal.html',
			controller: 'deleteSOConfirmationMICtrl'
		});
		deleteSOConfirmationMI.result.then(function(){	
			SaleOrder.delete({sorderid: $scope.sorder._id}, function(response){
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
			SaleOrder.create({sorderid:$scope.sorder._id, action:'addpayment'}, payment, function(response){
				if(response.success){
					$scope.sorder = response.data;
					$scope.totalpaid = 0;
					for(var i=0; i<$scope.sorder.sopayments.length; i++){
						 $scope.totalpaid = $scope.totalpaid + $scope.sorder.sopayments[i].amount;
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


	// // console.log(porder);
	// $scope.porderitems = porder.poitems;
	
	// $scope.porder.delete = false;




}]);

appControllers.controller('deleteSOConfirmationMICtrl', 
['$scope', '$uibModalInstance', '$uibModal',
function($scope, $uibModalInstance, $uibModal){
	$scope.text = "Delete Sale Order?";
	$scope.ok = function() { $uibModalInstance.close(); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);

appControllers.controller('addPaymentCtrl', 
['$scope', '$uibModalInstance', '$uibModal',
function($scope, $uibModalInstance, $uibModal){
	$scope.ok = function() { $uibModalInstance.close($scope.inputAmount); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);


appControllers.controller('customerCtrl', 
	['$scope', 'Customer', '$uibModal',
	function($scope, Customer, $uibModal){

	$scope.customers = Customer.getall();

	$scope.addcustomer = function(){
		var addCustomerModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/customerModal.html',
			controller: 'addCustomerModalCtrl'
		});
		addCustomerModalInstance.result.then(function(customer){
			Customer.create(customer, function(response){
				$scope.customers = Customer.getall();
			});
		});
	};

	$scope.updatecustomer = function(customer){
		var updateCustomerModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/customerModal.html',
			controller: 'updateCustomerModalCtrl',
			resolve: {
				customer: function(){ return angular.copy(customer) }
			}
		});
		updateCustomerModalInstance.result.then(function(customer){
			Customer.update({customerid: customer._id}, customer, function(response){
				$scope.customers = Customer.getall();
			}, function(error){ console.log(error); });
		});
	};

	$scope.removecustomer = function(customer){
		customer.delete = false;
		var deleteCustomerModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/confirmationModal.html',
			controller: 'deleteCustomerModalCtrl',
			resolve: {
				customer: function(){ return angular.copy(customer) }
			}			
		});
		deleteCustomerModalInstance.result.then(function(customer){
			if (customer.delete) {
				Customer.delete({customerid:customer._id}, function(response){
					$scope.customers = Customer.getall();
				}, function(error){ console.log(error); });				
			}
		});
	};
	
}]);


appControllers.controller('addCustomerModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal',
	function($scope, $uibModalInstance, $uibModal){
	$scope.title = "Add Customers";
	$scope.actionbutton = "Add";
	$scope.customer = {}
	$scope.ok = function() { $uibModalInstance.close($scope.customer); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);

appControllers.controller('updateCustomerModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'customer',
	function($scope, $uibModalInstance, $uibModal, customer){
	$scope.title = "Edit Customer";
	$scope.actionbutton = "Save";
	$scope.customer = customer;
	$scope.ok = function() { $uibModalInstance.close($scope.customer); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);

appControllers.controller('deleteCustomerModalCtrl', 
['$scope', '$uibModalInstance', '$uibModal', 'customer',
function($scope, $uibModalInstance, $uibModal, customer){
	$scope.text = "Are you sure you want to delete Customer '"+customer.name+"'";
	$scope.ok = function() { 
		customer.delete = true;
		$uibModalInstance.close(customer); 
	};
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);





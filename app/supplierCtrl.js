appControllers.controller('supplierCtrl', 
	['$scope', 'Supplier', '$uibModal',
	function($scope, Supplier, $uibModal){

	$scope.suppliers = Supplier.getall();

	$scope.addsupplier = function(){
		var addSupplierModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/supplierModal.html',
			controller: 'addSupplierCtrl'
		});
		addSupplierModalInstance.result.then(function(supplier){
			Supplier.create(supplier, function(response){
				$scope.suppliers = Supplier.getall();
			});
		});
	};

	$scope.updatesupplier = function(supplier){
		var updateSupplierModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/supplierModal.html',
			controller: 'updateSupplierCtrl',
			resolve: {
				supplier: function(){ return angular.copy(supplier) }
			}
		});
		updateSupplierModalInstance.result.then(function(supplier){
			console.log(supplier);
			Supplier.update({supplierid: supplier._id}, supplier, function(response){
				$scope.suppliers = Supplier.getall();
			}, function(error){ console.log(error); });
		});
	};

	$scope.removesupplier = function(supplier){
		supplier.delete = false;
		var deleteSupplierModalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/views/modals/confirmationModal.html',
			controller: 'deleteSupplierModalCtrl',
			resolve: {
				supplier: function(){ return angular.copy(supplier) }
			}			
		});
		deleteSupplierModalInstance.result.then(function(supplier){
			if (supplier.delete) {
				Supplier.delete({supplierid:supplier._id}, function(response){
					$scope.suppliers = Supplier.getall();
				}, function(error){ console.log(error); });				
			}
		});
	};
	
}]);


appControllers.controller('addSupplierCtrl', 
	['$scope', '$uibModalInstance', '$uibModal',
	function($scope, $uibModalInstance, $uibModal){
	$scope.title = "Add Suppliers";
	$scope.actionbutton = "Add";
	$scope.supplier = {}
	$scope.ok = function() { $uibModalInstance.close($scope.supplier); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);

appControllers.controller('updateSupplierCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'supplier',
	function($scope, $uibModalInstance, $uibModal, supplier){
	$scope.title = "Edit Supplier";
	$scope.actionbutton = "Save";
	$scope.supplier = supplier;
	$scope.ok = function() { $uibModalInstance.close($scope.supplier); };
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);

appControllers.controller('deleteSupplierModalCtrl', 
['$scope', '$uibModalInstance', '$uibModal', 'supplier',
function($scope, $uibModalInstance, $uibModal, supplier){
	$scope.text = "Are you sure you want to delete Supplier '"+supplier.name+"'";
	$scope.ok = function() { 
		supplier.delete = true;
		$uibModalInstance.close(supplier); 
	};
	$scope.cancel = function() { $uibModalInstance.dismiss(); };
}]);





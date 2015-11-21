appControllers.controller('sellCtrl', 
['$scope', '$uibModal', 'SaleOrder', 'SaleOrderItem',
function($scope, $uibModal, SaleOrder, SaleOrderItem) {

	$scope.sitems = [];
	$scope.sorders = SaleOrder.getall();

	$scope.sellview = function(){
		$scope.sellMode = true;
		$scope.sitems = [];
		var newsitem = {};
		$scope.sitems.push(newsitem);		
		$scope.grandtotal = 0;
	};
	$scope.back = function(){
		$scope.sorders = SaleOrder.getall();
		$scope.sitems = [];
		$scope.sellMode = false;
		$scope.grandtotal = 0;
	};
	$scope.addrow = function(){
		var newsitem = {};
		$scope.sitems.push(newsitem);
	};
	$scope.clear = function(){
		$scope.sitems = [];
		var newsitem = {};
		$scope.sitems.push(newsitem);
		$scope.grandtotal = 0;
	};

	$scope.addcustomer = function(){
		var addCustomerMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/chooseCustomerModal.html',
			controller: 'chooseCustomerModalCtrl'
		});
		addCustomerMI.result.then(function(customer){
			$scope.customer = customer;
		});		
	};
	$scope.additem = function($index){
		var chooseItemMI = $uibModal.open({
			animation: true,
			templateUrl: '/views/chooseItemModal.html',
			controller: 'chooseItemModalCtrl'	
		});
		chooseItemMI.result.then(function(item){
			$scope.sitems[$index].item = item;
			$scope.error = null;
			_.forEach($scope.sitems, function(n, index){
				if(n.item == null || n.item == undefined){
					$scope.error = "Item "+ (index+1) +" is missing"
				}
			});
		});
	};
	$scope.removeitem = function($index){
		$scope.sitems.splice($index, 1);
		$scope.valuechanged($index);
	};
	$scope.valuechanged = function($index){
		if($scope.sitems[$index]) {
			$scope.sitems[$index].total = $scope.sitems[$index].count * $scope.sitems[$index].price;			
		}
		$scope.grandtotal = 0;
		_.forEach($scope.sitems, function(n){
			$scope.grandtotal = $scope.grandtotal + (n.total || 0);
		});
	};

	$scope.done = function(){
		$scope.error = null;
		_.forEach($scope.sitems, function(n, index){
			if(n.item == null || n.item == undefined){
				$scope.error = "Item "+ (index+1) +" is missing"
			}
		});
		if($scope.error == null){
			var finalizeSaleOrderMI = $uibModal.open({
				animation: true,
				templateUrl: '/views/confirmationModal.html',
				controller: 'finalizeSaleOrderModalCtrl'
			});
			finalizeSaleOrderMI.result.then(function(){		
				var customerid = null;
				if($scope.customer != null){
					customerid = $scope.customer._id;
				}
				var sorder = {
					customerid: customerid,
					total: $scope.grandtotal || 0,
					remaining: 0
				};
				SaleOrder.create(sorder, function(response){

					// _.forEach($scope.sitems, function(n, index){
					// 	var sitem = {
					// 		item: n.item,
					// 		count: n.count,
					// 		price: n.price
					// 	};
					// 	console.log(sitem);
					// 	SaleOrderItem.create({sorderid: response._id}, sitem, function(response){
					// 		console.log(response)
					// 	}, function(error){console.log(error)});
					// });


					async.each($scope.sitems, function(n, callback){
						var sitem = {
							item: n.item,
							count: n.count,
							price: n.price
						};
						SaleOrderItem.create({sorderid: response._id}, sitem, function(response){
							console.log(response)
							callback();
						}, function(error){console.log(error)});
					}, function(err){
						$scope.sorders = SaleOrder.getall();
						$scope.sitems = [];
						$scope.sellMode = false;
						$scope.grandtotal = 0;
					});



				});
			});
		}
	};


}]);



// Modal Controllers
// -----------------

appControllers.controller('chooseCustomerModalCtrl', 
	['$scope', '$uibModalInstance', '$uibModal', 'Customer',
	function($scope, $uibModalInstance, $uibModal, Customer){
	$scope.title = "Choose Customer";
	$scope.customers = Customer.getall();
	$scope.selectcustomer = function(customer) { $uibModalInstance.close(customer); };
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


appFactories.factory('Category', ['$resource',
	function($resource){
	return $resource('http://localhost:5555/category/:categoryid', 
		{ categoryid: '@categoryid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);

appFactories.factory('Item', ['$resource', 
	function($resource){
	return $resource('http://localhost:5555/category/:categoryid/item/:itemid', 
		{ categoryid: '@categoryid', itemid: '@itemid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);


appFactories.factory('Supplier', ['$resource', 
	function($resource){
	return $resource('http://localhost:5555/supplier/:supplierid', 
		{ supplierid: '@supplierid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);

appFactories.factory('Customer', ['$resource', 
	function($resource){
	return $resource('http://localhost:5555/customer/:customerid', 
		{ customerid: '@customerid' }, {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);


appFactories.factory('PurchaseOrder', ['$resource', function($resource){
	return $resource('http://localhost:5555/porder/:porderid', 
		{ porderid: '@porderid' }, {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);
appFactories.factory('PurchaseOrderItem', ['$resource', function($resource){
	return $resource('http://localhost:5555/porder/:porderid/pitem/:pitemid', 
		{ porderid: '@porderid', porderitemid: '@porderitemid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);
appFactories.factory('PurchaseOrderPayment', ['$resource', function($resource){
	return $resource('http://localhost:5555/porder/:porderid/ppayment/:ppaymentid', 
		{ porderid: '@porderid', ppaymentid: '@ppaymentid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);


appFactories.factory('SaleOrder', ['$resource', 'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/sorder/:sorderid', 
		{ sorderid: '@sorderid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);
appFactories.factory('SaleOrderItem', ['$resource', function($resource){
	return $resource('http://localhost:5555/sorder/:sorderid/sitem/:sitemid', 
		{ sorderid: '@sorderid', sitemid: '@sitemid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);
appFactories.factory('SaleOrderPayment', ['$resource', function($resource){
	return $resource('http://localhost:5555/sorder/:sorderid/spayment/:spaymentid', 
		{ sorderid: '@sorderid', spaymentid: '@spaymentid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);

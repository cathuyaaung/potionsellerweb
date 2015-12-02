

appFactories.factory('authInterceptor', function ($q, $localStorage) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            // console.log($localStorage.token);
            if ($localStorage.token) {
                config.headers.auth = $localStorage.token;
            }
            return config;
        },
 
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
 
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            return response || $q.when(response);
        },
 
        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            return $q.reject(rejection);
        }
    };
})

appFactories.factory('Category', ['$resource', 'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/category/:categoryid', 
		{ categoryid: '@categoryid' },  {
			'getone': {method:'GET' },
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);

appFactories.factory('Item', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/category/:categoryid/item/:itemid', 
		{ categoryid: '@categoryid', itemid: '@itemid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);


appFactories.factory('Supplier', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/supplier/:supplierid', 
		{ supplierid: '@supplierid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);

appFactories.factory('Customer', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/customer/:customerid', 
		{ customerid: '@customerid' }, {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);


appFactories.factory('PurchaseOrder', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/porder/:porderid/:action', 
		{ porderid: '@porderid', action: '@action' }, {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);
appFactories.factory('PurchaseOrderItem', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/porder/:porderid/pitem/:pitemid', 
		{ porderid: '@porderid', porderitemid: '@porderitemid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);
appFactories.factory('PurchaseOrderPayment', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/porder/:porderid/ppayment/:ppaymentid', 
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
appFactories.factory('SaleOrderItem', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/sorder/:sorderid/sitem/:sitemid', 
		{ sorderid: '@sorderid', sitemid: '@sitemid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);
appFactories.factory('SaleOrderPayment', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/sorder/:sorderid/spayment/:spaymentid', 
		{ sorderid: '@sorderid', spaymentid: '@spaymentid' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);


appFactories.factory('Register', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/register', 
		{ },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);

appFactories.factory('Login', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/login', 
		{ },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);

appFactories.factory('User', ['$resource',  'ENV',
	function($resource, ENV){
	return $resource(ENV.apiendpoint+'/user/:action', 
		{ action: '@action' },  {
			'getone': {method:'GET'},
			'create': {method:'POST'},
			'getall': {method:'GET', isArray:true},
			'update': {method:'PUT'},
			'delete': {method:'DELETE'}
		});
}]);


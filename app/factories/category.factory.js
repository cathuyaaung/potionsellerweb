appFactories.factory('Category', 
	['$resource','configVariables',  function
	($resource, configVariables){

    return $resource(configVariables.resturl+'category/:categoryid', 
    	{ 
    		categoryid: '@categoryid'
    	}, 
    	{
    		'update': { method: 'PUT'}
    	});
  }]);


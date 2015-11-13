appFactories.factory('Category', ['$resource',
  function($resource){
    return $resource('http://localhost:5555/category/:categoryid', 
    	{ 
    		categoryid: '@categoryid'
    	}, 
    	{
    		'update': { method: 'PUT'}
    	});
  }]);
appServices.service('CategoryService', function(){
	var category = {};

	var setCategory = function(newObj){ category = newObj; };
	var getCategory = function(){ return category; };

	return {
		setCategory: setCategory,
		getCategory: getCategory
	};
});
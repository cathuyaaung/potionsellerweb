module.exports = function(){

	switch(process.env.NODE_ENV){

		case 'development':
			return {
				port: 3333
			};

		case 'production':
			return {
				port: 5555
			};

		default:
			return {
				port: 3333
			};

	}

}
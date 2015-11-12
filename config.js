module.exports = function(){

	switch(process.env.NODE_ENV){

		case 'development':
			return {
				port: 5555
			};

		case 'production':
			return {
				port: 5555
			};

		default:
			return {
				port: 5555
			};

	}

}
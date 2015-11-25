var app = angular.module('app', ['ui.router', 'ui.bootstrap','appControllers', 'appFactories', 'ngStorage']);

var appFactories = angular.module('appFactories', ['ngResource', 'config']);

var appControllers = angular.module('appControllers', ['appFactories']);


app.run(function ($rootScope, $state, $localStorage) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {  	
  	if(toState.data){
	    var requireLogin = toState.data.requireLogin;
	    if (requireLogin && typeof $localStorage.token === 'undefined') {
	      event.preventDefault();
	      $state.go('login');
	    }
  	}
  });

});



// Shorthand for $( document ).ready()
$(function() {
    
$('.nav a').on('click', function(){
    $('.navbar-toggle').click() //bootstrap 3.x by Richard
});

});
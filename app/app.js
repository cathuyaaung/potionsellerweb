var app = angular.module('app', ['ui.router', 'ui.bootstrap','appControllers', 'appFactories']);

var appFactories = angular.module('appFactories', ['ngResource', 'config']);

var appControllers = angular.module('appControllers', ['appFactories']);




// Shorthand for $( document ).ready()
$(function() {
    
$('.nav a').on('click', function(){
    $('.navbar-toggle').click() //bootstrap 3.x by Richard
});

});
var app = angular.module('app', ['ui.router', 'ui.bootstrap','appControllers', 'appFactories']);

var appFactories = angular.module('appFactories', ['ngResource', 'config']);

var appControllers = angular.module('appControllers', ['appFactories']);



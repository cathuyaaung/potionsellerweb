var app = angular.module('app', ['ui.router', 'ui.bootstrap','appControllers', 'appFactories']);

var appFactories = angular.module('appFactories', ['ngResource']);

var appControllers = angular.module('appControllers', ['appFactories']);



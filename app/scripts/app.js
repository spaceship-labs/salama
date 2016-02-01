'use strict';

/**
 * @ngdoc overview
 * @name salamaApp
 * @description
 * # salamaApp
 *
 * Main module of the application.
 */
angular
  .module('salamaApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

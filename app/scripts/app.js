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
    'ngTouch',
    'ngMaterial',//angular material
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/evaluation', {
        templateUrl: 'views/evaluation.html',
        controller: 'EvaluationCtrl',
        controllerAs: 'evaluation'
      })
      .when('/library', {
        templateUrl: 'views/library.html',
        controller: 'LibraryCtrl',
        controllerAs: 'library'
      })
      .when('/v3', {
        templateUrl: 'views/v3.html',
        controller: 'V3Ctrl',
        controllerAs: 'v3'
      })
      .when('/prov2', {
        templateUrl: 'views/prov2.html',
        controller: 'Prov2Ctrl',
        controllerAs: 'prov2'
      })
      .when('/article', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl',
        controllerAs: 'article'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

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
    'pascalprecht.translate'//angular translate
  ])
  .config(routeProvider)
  .config(translateProvider);

  routeProvider.$inject=['$routeProvider'];
  function routeProvider($routeProvider) {
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
  }

  translateProvider.$inject=['$translateProvider'];
  function translateProvider($translateProvider){
    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en_US');
  }

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
    'ngMaterial',//angular material
    'pascalprecht.translate',//angular translate
    'hc.marked', //markdown
    'ngStorage'//local storage
  ])
  .config(routeProvider)
  .config(translateProvider)
  .config(markdownProvider);

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
      .when('/article', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl',
        controllerAs: 'article'
      })
      .when('/individuals', {
        templateUrl: 'views/individuals.html',
        controller: 'IndividualsCtrl',
        controllerAs: 'individuals'
      })
      .when('/organizations', {
        templateUrl: 'views/organizations.html',
        controller: 'OrganizationsCtrl',
        controllerAs: 'organizations'
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
    $translateProvider.useLocalStorage();
  }

  markdownProvider.$inject=['markedProvider'];
  function markdownProvider(markedProvider){
    markedProvider.setOptions({gfm: true});
  }

'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the salamaApp
 */
angular.module('salamaApp')
  .controller('FooterCtrl', function ($scope) {
    $scope.okCookies = okCookies;
    $scope.okCookiesStorage = localStorage.getItem('okCookiesValue');

    function okCookies() {
      localStorage.setItem('okCookiesValue', true);
      $scope.okCookiesStorage = true;
    }
  });

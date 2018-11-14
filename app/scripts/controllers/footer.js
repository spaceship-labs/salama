'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the salamaApp
 */
angular.module('salamaApp')
  .controller('FooterCtrl', function ($scope, $translate, postsService) {
    $scope.okCookies = okCookies;
    $scope.okCookiesStorage = localStorage.getItem('okCookiesValue');

    function okCookies() {
      localStorage.setItem('okCookiesValue', true);
      $scope.okCookiesStorage = true;
    }

    function loadCopy() {
      var lang = $translate.use();
      var selected = lang + '/copyright.md';
      postsService.setSelected(selected);
      postsService.getPost()
        .then(function(res) {
          $scope.copyright = res;
        });
    }
    loadCopy();
    $scope.$watch(function() {
      return $translate.use();
    }, loadCopy);
  });

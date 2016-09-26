'use strict';

/**
 * @ngdoc directive
 * @name salamaApp.directive:ratebar
 * @description
 * # ratebar
 */
angular.module('salamaApp')
  .directive('ratebar', function () {
    var controller  = ['$scope', function($scope){
      $scope.colors = ['#8C69B7', '#4CC2E0', '#FFAF64', '#8C564B', '#E377C2'];
      $scope.legends= [
        'views.results.probability',
        'views.results.time',
        'views.results.financial',
        'views.results.physical',
        'views.results.reputation',
      ];
    }];

    return {
      templateUrl: 'views/directives/ratebar.html',
      restrict: 'E',
      scope: {
        risks: '='
      },
      controller: controller
    };
  });

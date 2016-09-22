'use strict';

/**
 * @ngdoc directive
 * @name salamaApp.directive:ratebar
 * @description
 * # ratebar
 */
angular.module('salamaApp')
  .directive('ratebar', function () {
    var controller = ['$scope', function($scope){
      var acum = $scope.rate.reduce(function(acum, current) {return acum + current}, 0);
      $scope.colors = ['#8C69B7', '#4CC2E0', '#FFAF64', '#8C564B', '#E377C2'];
      $scope.legends= ['Ocurrencia', 'Tiempo', 'Finanzas', 'Comida', 'e']
      $scope.rate = $scope.rate.map(function(w) {
        var w = (w / acum) * 100;
        return Number(w.toFixed(0));
      });
      console.log($scope.rate);
    }];

    return {
      templateUrl: 'views/directives/ratebar.html',
      restrict: 'E',
      scope: {
        rate: '='
      },
      controller: controller
    };
  });

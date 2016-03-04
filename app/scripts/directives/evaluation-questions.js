 'use strict';

/**
 * @ngdoc directive
 * @name salamaApp.directive:evaluationQuestions
 * @description
 * # evaluationQuestions
 */

angular.module('salamaApp')
  .directive('evaluationQuestions', evaluationQuestions);

function evaluationQuestions(){

  var controller = ['$scope',function ($scope){

    $scope.directiveUrl = 'views/directives/evaluation-questions/';
    console.log($scope);

    $scope.next = function (){

    }

    $scope.prev = function (){

    }

  }];
  return {
    scope : {
      evaluation : '='
    },
    controller : controller,
    templateUrl : 'views/directives/evaluation-questions/evaluation-questions.html'
  }
}

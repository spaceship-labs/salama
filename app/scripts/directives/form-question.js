'use strict';

/**
 * @ngdoc directive
 * @name salamaApp.directive:formQuestion
 * @description
 * # formQuestion
 */

angular.module('salamaApp')
  .directive('formQuestion',formQuestion);

  function formQuestion(){

    var controller = ['$scope',function($scope){

      $scope.directiveUrl = 'views/directives/questions/';

      if($scope.question.type === 'table-multiradio'){
        $scope.directiveUrl += 'table-multiradio.html';
      }else{
        $scope.directiveUrl += $scope.question.input + '.html';
      }

    }];

    return {
      scope : {
        question : '='
      },
      controller : controller,
      templateUrl: 'views/directives/questions/questions.html'
    };

  }

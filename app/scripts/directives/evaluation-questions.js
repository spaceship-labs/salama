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

  var link = function (scope,element,attr){

    var eq = $('#eq');
    var pages = $('.eq-pages');
    var page = $('.eq-page');
    console.log(scope.evaluation);

    scope.$watch( scope.evaluation.questions ,function (){
      scope.evaluation
      var baseWidth = eq.width();
      var fullWidth = baseWidth * scope.evaluation.questions.length;
      console.log(baseWidth);
      console.log(fullWidth);
    });

    scope.directiveUrl = 'views/directives/evaluation-questions/';

    scope.next = function (){
      console.log('next');
      console.log( pages );
      console.log( page );
    }

    scope.prev = function (){
      console.log('prev');
      console.log( pages );
      console.log( page );
    }

  };
  return {
    scope : {
      evaluation : '='
    },
    link : link,
    templateUrl : 'views/directives/evaluation-questions/evaluation-questions.html'
  };
}

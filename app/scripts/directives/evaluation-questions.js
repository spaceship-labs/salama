 'use strict';

/**
 * @ngdoc directive
 * @name salamaApp.directive:evaluationQuestions
 * @description
 * # evaluationQuestions
 */

angular.module('salamaApp')
  .directive('evaluationQuestions', evaluationQuestions);

evaluationQuestions.$inject = ['$window','$timeout'];

function evaluationQuestions($window,$timeout){

  var link = function (scope,element,attr){

    scope.translate = 0;
    scope.base = 300;
    scope.full = 500;
    var eq = $('#eq');
    var pages = $('.eq-pages');

    scope.directiveUrl = 'views/directives/evaluation-questions/';

    scope.setSizes = function (base,full){
      $timeout(function (){
        scope.base = base;
        scope.full = full;
        var page = $('.eq-page');
        pages.width(scope.full+'px');
        page.width(scope.base+'px');
      },500);
    };

    scope.next = function (){
      var n = 0 - scope.full + scope.base;
      if(scope.translate > n){
        scope.translate -= scope.base;
      }
      scope.evaluation.completed += 10;
      pages.css('transform','translateX('+scope.translate+'px)');
    };

    scope.prev = function (){
      console.log('prev');
      if(scope.translate < 0){
        scope.translate += scope.base;
      }
      scope.evaluation.completed -= 10;
      pages.css('transform','translateX('+scope.translate+'px)');
    };

    scope.completedBar = function (percentage){
      $('.eq-bluebar').width(percentage+'%');
    }

    scope.watchers = [
      function(){return scope.evaluation.questions.length},
      function(){return $($window).width()}
    ];

    scope.$watchGroup(
      scope.watchers,
      function (newVal,oldVal){
        var baseWidth = eq.width();
        var fullWidth = baseWidth * newVal[0];
        scope.setSizes(baseWidth,fullWidth);
    });

    scope.$watch(
      function (){return scope.evaluation.completed},
      function (newVal,oldVal){
        scope.completedBar(newVal);
      });

  };

  return {
    scope : {
      evaluation : '='
    },
    link : link,
    templateUrl : 'views/directives/evaluation-questions/evaluation-questions.html'
  };

};

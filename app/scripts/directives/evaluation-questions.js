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

    scope.directiveUrl = 'views/directives/evaluation-questions/';
    scope.translate = 0;
    scope.pageNum = 0;
    scope.base = 300;
    scope.full = 500;
    var eq = $('#eq');
    var pages = $('.eq-pages');

    scope.setSizes = function (base,full){
      $timeout(function (){
        scope.base = base;
        scope.full = full;
        var page = $('.eq-page');
        pages.width(scope.full+'px');
        page.width(scope.base+'px');
        scope.setPages();
      },500);
    };

    scope.setPages = function (){
      scope.translate = 0 - (scope.pageNum * scope.base);
      pages.css('transform','translateX('+scope.translate+'px)');
    };

    scope.next = function (){
      var n = 0 - scope.full + scope.base;
      if(scope.translate > n){
        scope.pageNum++;
        scope.setPages();
      }
      // scope.evaluation.completed += 10; // Esta linea solo es para comprobar el funcionamiento de la brarra azul
    };

    scope.prev = function (){
      if(scope.translate < 0){
        scope.pageNum--;
        scope.setPages();
      }
      // scope.evaluation.completed -= 10; // Esta linea solo es para comprobar el funcionamiento de la brarra azul
    };

    scope.completedBar = function (percentage){
      $('.eq-bluebar').width(percentage+'%');
    };

    scope.watchers = [
      function(){return scope.evaluation.questions.length;},
      function(){return $($window).width();}
    ];

    scope.$watchGroup(
      scope.watchers,
      function (newVal,oldVal){
        $timeout(function (){
          var baseWidth = eq.width();
          var fullWidth = baseWidth * newVal[0];
          scope.setSizes(baseWidth,fullWidth);
        });
    });

    scope.$watch(
      function (){return scope.evaluation.completed},
      function (newVal,oldVal){
        $timeout(function (){
          scope.completedBar(newVal);
        });
      });

  };

  var templateUrl = 'views/directives/evaluation-questions/evaluation-questions.html';

  return {
    scope : {
      evaluation : '='
    },
    link : link,
    templateUrl : templateUrl
  };

}

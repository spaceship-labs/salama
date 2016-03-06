'use strict';

/**
 * @ngdoc directive
 * @name salamaApp.directive:pageQuestions
 * @description
 * # pageQuestions
 */
(function(){
  angular.module('salamaApp')
    .directive('pageQuestions', pageQuestions);

  controller.$inject=['$scope'];

  function controller($scope){

    var ctrl = $scope;

    ctrl.last = false;
    ctrl.start = true;
    ctrl.selected = 0;
    ctrl.next = next;
    ctrl.prev = prev;

    $scope.$watch(
      function(){
        return ctrl.questions;
      },
      function(){
        ctrl.selected = 0;
      }
    );

    function next(){
      if (ctrl.selected < ctrl.questions.length-1) {
        ctrl.selected+=1;
      } else {
        ctrl.selected = ctrl.questions.length -1;
      }
      evaluateIndex();
    }

    function prev(){
      if (ctrl.selected > 0) {
        ctrl.selected -= 1;
      } else {
        ctrl.selected = 0;
      }
      evaluateIndex();
    }

    function evaluateIndex(){
      if (ctrl.selected == ctrl.questions.length - 1){
        ctrl.last = true;
      } else if (ctrl.selected == 0){
        ctrl.start = true;
      } else{
        ctrl.start = ctrl.last = false;
      }
    }

  }

  function pageQuestions() {
    return {
      templateUrl: 'views/directives/page.html',
      restrict: 'E',
      scope:{
        questions:'=',
        answers:'=',
        finish:'='
      },
      controller:controller
    };
  }
})();


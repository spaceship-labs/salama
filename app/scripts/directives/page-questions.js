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
    ctrl.completed = 0;


    ctrl.$watch(
      function(){
        return ctrl.questions;
      },
      function(){
        ctrl.selected = 0;
        setProgress();
      }
    );
    ctrl.$watch(
      function(){
        return ctrl.completed;
      },
      function (newVal,oldVal){
        $('.eq-bluebar').width(newVal+'%');
      }
    );

    function next(){
      if (ctrl.selected < ctrl.questions.length-1) {
        ctrl.selected+=1;
      } else {
        ctrl.selected = ctrl.questions.length -1;
      }
      evaluateIndex();
      setProgress();
    }

    function prev(){
      if (ctrl.selected > 0) {
        ctrl.selected -= 1;
      } else {
        ctrl.selected = 0;
      }
      evaluateIndex();
      setProgress();
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

    function setProgress(){
      var score = 100 * (ctrl.selected + 1) / ctrl.questions.length;
      ctrl.completed =  Math.floor(score);
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


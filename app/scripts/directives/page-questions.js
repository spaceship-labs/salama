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

  controller.$inject=['$scope', '$translate'];

  function controller($scope, $translate){

    var ctrl = $scope;

    ctrl.last = false;
    ctrl.start = true;
    ctrl.selected = 0;
    ctrl.next = next;
    ctrl.prev = prev;
    ctrl.completed = 0;

    activate();

    function activate(){
      $scope.$watch(getType,setQuestions);
      $scope.$watch(getCompleted,setBar);
    }

    function getCompleted(){
      return ctrl.completed;
    }

    function getType(){
      return ctrl.type;
    }

    function setBar(newVal){
      $('.eq-bluebar').width(newVal+'%');
    }

    function setQuestions(){
      ctrl.selected = 0;
      setProgress();
    }

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
      ctrl.completed =  isFinite(ctrl.completed) && ctrl.completed || 0;
    }

  }

  function pageQuestions() {
    return {
      templateUrl: 'views/directives/page.html',
      restrict: 'E',
      scope:{
        questions:'=',
        answers:'=',
        type: '=',
        finish:'='
      },
      controller:controller
    };
  }
})();


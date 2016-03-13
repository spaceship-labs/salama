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

  controller.$inject=['$scope', '$localStorage', '$translate'];

  function controller($scope, $localStorage, $translate){

    var ctrl = $scope;
    var db = $localStorage.dirPage = $localStorage.dirPage || {};
    db.type = db.type || '';

    ctrl.selected = db.selected || 0;
    ctrl.last = false;
    ctrl.start = true;
    ctrl.completed = 0;
    ctrl.next = next;
    ctrl.prev = prev;

    activate();

    function activate(){
      $scope.$watch(getType, setType);
      $scope.$watch(getQuestions, setQuestions);
      $scope.$watch(getCompleted, setBar);
    }

    function setQuestions(){
      evaluateIndex();
      setProgress();
    }

    function getCompleted(){
      return ctrl.completed;
    }

    function getType(){
      return ctrl.type;
    }

    function getQuestions(){
      return ctrl.questions;
    }

    function setType(type){
      if ( !type || db.type == type){
        return;
      }
      db.type = type;
      db.selected = ctrl.selected = 0;
    }

    function setBar(newVal){
      $('.eq-bluebar').width(newVal+'%');
    }

    function next(){
      if (ctrl.selected < ctrl.questions.length-1) {
        ctrl.selected = ctrl.selected + 1;
      } else {
        ctrl.selected = ctrl.questions.length -1;
      }
      db.selected = ctrl.selected;
      evaluateIndex();
      setProgress();
    }

    function prev(){
      if (ctrl.selected > 0) {
        ctrl.selected -= 1;
      } else {
        ctrl.selected = 0;
      }
      db.selected = ctrl.selected;
      evaluateIndex();
      setProgress();
    }

    function evaluateIndex(){
      if (ctrl.selected == ctrl.questions.length - 1){
        ctrl.last = true;
        ctrl.start = false;
      } else if (ctrl.selected == 0){
        ctrl.start = true;
        ctrl.last = false;
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
        questions: '=',
        answers:   '=',
        type:      '=',
        finish:    '='
      },
      controller:controller
    };
  }
})();


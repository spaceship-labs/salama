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

  controller.$inject=['$scope','$routeParams','$localStorage', '$translate'];

  function controller($scope,$routeParams,$localStorage, $translate){

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

    ctrl.multipleAnswer = {};

    ctrl.setMultipleAnswer = function(qName, option, max) {
      ctrl.multipleAnswer[qName] = ctrl.multipleAnswer[qName] || {};
      if (ctrl.multipleAnswer[qName][option.option]) {
        ctrl.multipleAnswer[qName][option.option] = false;
      } else {
        ctrl.multipleAnswer[qName][option.option] = option.value;
      }

      toggleMultipleAnswer(qName, max);

    };

    ctrl.initMultipleAnswer = function(qName, options, max) {
      var val = ctrl.answers[qName];
      if (!val) {
        return ;
      }

      var d = {};
      options.forEach(function(opt) {
        if (val === max || val === opt.value ) {
          d[opt.option] = opt.value;
        }
      });
      ctrl.multipleAnswer[qName] = d;
    };

    function toggleMultipleAnswer(qName, max) {
      var select = Object.keys(ctrl.multipleAnswer[qName]).filter(function(f) {
        return ctrl.multipleAnswer[qName][f];
      });

      if (select.length === 2) {
        ctrl.answers[qName] = max;
      } else if (select.length === 0) {
        ctrl.answers[qName] = 0;
      } else {
        var val = 0;
        select.forEach(function(s) {
          val += ctrl.multipleAnswer[qName][s];
        });

        ctrl.answers[qName] = val;
      }
    }

    function activate(){
      if ($routeParams.action == 'finish'){
        ctrl.selected = ctrl.questions.length - 1;
      }else{
        ctrl.selected = Number($routeParams.action) || 0;
      }
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


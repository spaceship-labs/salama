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

  controller.$inject=['$scope','$routeParams','$localStorage', '$translate', '$location'];

  function controller($scope,$routeParams,$localStorage, $translate, $location){

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
      if ($routeParams.action == 'finish'){
        ctrl.selected = ctrl.questions.length - 1;
      }else{
        ctrl.selected = Number($routeParams.action) || 0;
      }
      $scope.$watch(getType, setType);
      $scope.$watch(getQuestions, setQuestions);
      $scope.$watch(getCompleted, setBar);
    }

    function checkFilters() {

    }

    function setQuestions(){
      evaluateIndex();
      setProgress();

      if (ctrl.questions && ctrl.questions.length) {
        ctrl.filtersQ = ctrl.questions[0].questions.map(setFilters);
        //set number-page in url.
        if (ctrl.questions[ctrl.selected].filterData && !ctrl.filtersQ.filter(filterAvailable(ctrl.questions[ctrl.selected])).length) {
          var forceNext = getSelectedWithFilter(true);
          $location.path('/evaluation/organizations/'+forceNext);
        }
      }

    }

    function getCompleted(){
      return ctrl.completed;
    }

    function getType(){
      return ctrl.type;
    }

    function filterAvailable(ques) {
      return function filter(ft) {
        if (ques.filterData[ft]) {
          if (ctrl.answers[ft] >= ques.filterData[ft]) {
            return true;
          }
        }
      };
    }

    function getSelectedWithFilter(nextVal) {
      var next = nextVal ? ctrl.selected+1 : ctrl.selected-1;
      var ques = ctrl.questions[next];
      if (ques && ques.filterData) {
        var fNext = ctrl.filtersQ.filter(filterAvailable(ques));
        if (fNext.length) {
          return next;
        }

        ctrl.selected += nextVal ? +1 : -1;
        return getSelectedWithFilter(nextVal);
      }

      return next;
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

    function setFilters(fil) {
      return fil.name;
    }

    function next(){
      if (ctrl.selected < ctrl.questions.length-1) {
        ctrl.selected = getSelectedWithFilter(true);
      } else {
        ctrl.selected = ctrl.questions.length -1;
      }


      db.selected = ctrl.selected;

      evaluateIndex();
      setProgress();
    }

    function prev(){
      if (ctrl.selected > 0) {
        //ctrl.selected -= 1;
        ctrl.selected = getSelectedWithFilter();
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


'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:EvaluationCtrl
 * @description
 * # EvaluationCtrl
 * Controller of the salamaApp
 */
(function(){
  angular.module('salamaApp')
    .controller('EvaluationCtrl', EvaluationCtrl);

  EvaluationCtrl.$inject = [
    '$scope',
    '$translate',
    'individualsService',
    'organizationsService'
  ];

  function EvaluationCtrl(
    $scope,
    $translate,
    individualsService,
    organizationsService
  ){

    var ctrl = this;
    ctrl.individuals = 'individual';
    ctrl.organizations = 'organizations';
    ctrl.type;
    ctrl.page;
    ctrl.completed;
    ctrl.questions = [];
    ctrl.answers = {};
    ctrl.setType = setType;
    ctrl.finishEvaluation = finishEvaluation;

    activate();

    function activate(){
      $scope.$watch(getLangAndType, getQuestions);
    }

    function getLangAndType(){
        return $translate.use() + ctrl.type;
    }

    function setType(type){
      ctrl.type = type;
      ctrl.completed = 10;
      ctrl.page = 1;
    }

    function getQuestions(){
      var lang = $translate.use();
      if (ctrl.type == ctrl.individuals) {
        return individualsService
          .getEval(lang)
          .then(setQuestions);
      }else{
        return organizationsService
          .getEval(lang)
          .then(setQuestions);
      }
    }

    function setQuestions(questions){
      ctrl.questions = questions;
    }

    function finishEvaluation(){
      ctrl.completed = 100;
      ctrl.page = 2;
    }

  }
})();


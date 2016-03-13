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
    '$routeParams',
    '$localStorage',
    '$translate',
    'individualsService',
    'organizationsService',
  ];

  function EvaluationCtrl(
    $scope,
    $routeParams,
    $localStorage,
    $translate,
    individualsService,
    organizationsService
  ) {

    var lang;
    var ctrl = this;
    var individuals = 'individual';
    var organizations = 'organizations';
    var finish = 'finish';
    var db = $localStorage.evaluation = $localStorage.evaluation || {};

    ctrl.questions = db.questions = db.questions || [];
    ctrl.answers = db.answers = db.answers || {};

    activate();

    function activate(){
      setState();
      $scope.$watch(getLang,getEvaluation);
    }

    function getLang(){
      return $translate.use();
    }

    function getEvaluation(lang){
      if (ctrl.type == individuals) {
        individualsService.getEval(lang).then(setEvaluation);
      }else if (ctrl.type == organizations) {
        organizationsService.getEval(lang).then(setEvaluation);
      }
    }

    function setEvaluation(questions){
      ctrl.questions = questions;
    }

    function setState(){
      var type = $routeParams.type;
      var action = $routeParams.action;
      if (type == individuals || type == organizations) {
        ctrl.type = type;
        ctrl.page = 1;
      }
      if (ctrl.type && action == finish) {
        ctrl.completed = 100;
        ctrl.page = 2;
      }
    }

  }
})();


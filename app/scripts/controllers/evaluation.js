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
    '$http',
    '$scope',
    '$translate',
    'individualsService',
    'organizationsService'
  ];

  function EvaluationCtrl(
    $http,
    $scope,
    $translate,
    individualsService,
    organizationsService
  ){

    var ctrl = this;
    var urlApi = 'http://salama-api.herokuapp.com/survey';
    ctrl.individuals = 'individual';
    ctrl.organizations = 'organizations';
    ctrl.type = undefined;
    ctrl.page = 0 ;
    ctrl.completed = 0;
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

    function setType(type){
      ctrl.type = type;
      ctrl.completed = 0;
      ctrl.page = 1;
    }

    function finishEvaluation(){
      ctrl.completed = 100;
      ctrl.page = 2;
      sendQuestions();
    }

    function sendQuestions(){
      ctrl.answers['survey_type'] = ctrl.type;
      $http.post(urlApi, ctrl.answers).success(function(a){
        console.log(a);
      });
    }
  }
})();


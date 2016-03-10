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
    '$mdDialog',
    'individualsService',
    'organizationsService',
    'adviceService'
  ];

  function EvaluationCtrl(
    $http,
    $scope,
    $translate,
    $mdDialog,
    individualsService,
    organizationsService,
    adviceService
  ){

    var urlApi = 'http://salama-api.herokuapp.com/survey';
    var ctrl = this;
    var risks;
    ctrl.questions = [];
    ctrl.answers = {};
    ctrl.checkResults = false;
    ctrl.individuals = 'individual';
    ctrl.organizations = 'organizations';
    ctrl.type;
    ctrl.page = 0;
    ctrl.completed = 0;
    ctrl.finalScore = 0;
    ctrl.setType = setType;
    ctrl.finishEvaluation = finishEvaluation;
    ctrl.showAdvice = showAdvice;
    ctrl.sendEvaluation = sendEvaluation;

    risks = {
      extreme : {
        level       : 'extreme',
        image       : '/images/riesgo_extremo.jpg',
        description : 'Suspender actividad si el riesgo es inaceptable y fallan estrategias'
      },
      high    : {
        level       : 'high',
        image       : '/images/riesgo_alto.jpg',
        escription : 'Require medidas proactivas y reducción de riesgos inaceptables'
      },
      medium  : {
        level       : 'mid',
        image       : '/images/riesgo_medio.jpg',
        description : 'Estrategias de prevención para mitigar el daño eventual'
      },
      low     : {
        level       : 'low',
        image       : '/images/riesgo_bajo.jpg',
        description : 'Continuidad de actividades'
      }
    };

    activate();

    function activate(){
      $scope.$watch(getLangAndType, getQuestions);
      $scope.$watch(getLang,getAdvice);
    }

    function getLangAndType(){
      return getLang() + ctrl.type;
    }

    function getLang(){
      return $translate.use();
    }

    function getQuestions(){
      var lang = $translate.use();
      if (ctrl.type == ctrl.individuals) {
        return individualsService
          .getEval(lang)
          .then(setQuestions);
      } else if (ctrl.type == ctrl.organizations) {
        return organizationsService
          .getEval(lang)
          .then(setQuestions);
      }
    }

    function getScore(){
      var score = 0;
      ctrl.questions.map(function(page){
        page.questions.map(function(question){
          if (question.score) {
            score += Number(ctrl.answers[question.name]) || 0;
          }
        });
      });
      return score;
    }

    function getAdvice(){
      if (!ctrl.risk) {
        return;
      }
      adviceService.setLang($translate.use());
      adviceService.getAdvice(ctrl.risk.level).then(function(advice){
        ctrl.advice = advice;
      });
    }
    function showAdvice(){
      ctrl.checkResults = true;
    }

    function setQuestions(questions){
      ctrl.questions = questions;
    }

    function setType(type){
      ctrl.type = type;
      ctrl.completed = 0;
      ctrl.page = 1;
    }

    function setResults() {
      if (ctrl.finalScore <= 40) {
        ctrl.risk = risks.low;
      } else
      if (ctrl.finalScore <= 59) {
        ctrl.risk = risks.medium;
      } else
      if (ctrl.finalScore <= 79) {
        ctrl.risk = risks.high;
      } else {
        ctrl.risk = risks.extreme;
      }
    }

    function setScore(){
      var score = getScore();
      ctrl.finalScore = score || 0;
    }

    function finishEvaluation(){
      ctrl.completed = 100;
      ctrl.page = 2;
      setScore();
      setResults();
      getAdvice();
    }

    function sendEvaluation(ev){
      ctrl.answers['survey_type'] = ctrl.type;
      $http.post(urlApi, ctrl.answers).then(
        function(_){
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#results')))
            .clickOutsideToClose(true)
            .title('Your answers were submited')
            .textContent('Thank you for your time, you will receive an email')
            .ariaLabel('')
            .ok('Agree')
            .targetEvent(ev)
          );
        },
        function(_){
          console.error("problem posting the results")
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#results')))
            .clickOutsideToClose(true)
            .title('Your answers were submited')
            .textContent('Thank you for your time, you will receive an email')
            .ariaLabel('')
            .ok('Agree')
            .targetEvent(ev)
          );
        }
      );
    }
  }
})();


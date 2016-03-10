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

    var urlApi = 'http://salama-api.herokuapp.com/survey';
    var ctrl = this;
    var risks;
    ctrl.questions = [];
    ctrl.answers = {};
    ctrl.individuals = 'individual';
    ctrl.organizations = 'organizations';
    ctrl.type = undefined;
    ctrl.page = 0;
    ctrl.completed = 0;
    ctrl.checkResults = false;
    ctrl.finalScore = 0;
    ctrl.setType = setType;
    ctrl.finishEvaluation = finishEvaluation;

    risks = {
      extreme : {
        level       : 'Extremo',
        image       : '/images/riesgo_extremo.jpg',
        description : 'Suspender actividad si el riesgo es inaceptable y fallan estrategias'
      },
      high    : {
        level       : 'Alto',
        image       : '/images/riesgo_alto.jpg',
        escription : 'Require medidas proactivas y reducción de riesgos inaceptables'
      },
      medium  : {
        level       : 'Moderado',
        image       : '/images/riesgo_medio.jpg',
        description : 'Estrategias de prevención para mitigar el daño eventual'
      },
      low     : {
        level       : 'Bajo',
        image       : '/images/riesgo_bajo.jpg',
        description : 'Continuidad de actividades'
      }
    };

    activate();

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
      ctrl.checkResults = true;
    }

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
      } else if (ctrl.type == ctrl.organizations) {
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
      setScore();
      sendQuestions();
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

    function setScore(){
      var score = getScore();
      ctrl.finalScore = score || 0;
      setResults();
    }

    function sendQuestions(){
      ctrl.answers['survey_type'] = ctrl.type;
      $http.post(urlApi, ctrl.answers).success(function(a){
        console.log(a);
      });
    }
  }
})();


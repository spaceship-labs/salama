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
    '$location',
    '$routeParams',
    '$translate',
    '$localStorage',
    'individualsService',
    'organizationsService',
    'adviceService'
  ];

  function EvaluationCtrl(
    $scope,
    $location,
    $routeParams,
    $translate,
    $localStorage,
    individualsService,
    organizationsService,
    adviceService
  ) {
    var ctrl    = this;
    var storage = $localStorage.evaluationCtrl = $localStorage.evaluationCtrl || {
      answers: {
        individuals: {},
        organizations: {}
      }
    };

    ctrl.type      = $routeParams.type;
    ctrl.questions = [];
    ctrl.answers   = {};
    ctrl.page      = 0;
    ctrl.finish    = finish;


    activate();

    function activate(){
      $scope.$watch(getLang, setQuestions);
    }

    function getLang(){
      return $translate.use();
    }

    function setQuestions(lang){
      ctrl.page = 1;
      switch (ctrl.type) {
        case 'individual':
          var completed = adviceService.getResultsIndividuals().completed;
          if (completed) {
            $location.path('/advice');
          }
          individualsService.getEval(lang).then(function(questions){
              ctrl.questions = questions;
              ctrl.answers   = storage.answers.individuals;
          });
          break;
        case 'organizations':
          organizationsService.getEval(lang).then(function(questions){
            ctrl.questions = questions;
            ctrl.answers   = storage.answers.organizations;
          });
          break;
        default:
          ctrl.page = 0;
          break
      }
    }

    function finish(){
      switch (ctrl.type) {
        case 'individual':
          var score     = getScoreIndividuals();
          var riskLevel = getRiskLevelIndividuals();
          var articles  = getArticlesIndividuals();
          adviceService.setResultsIndividuals({
            score: score,
            riskLevel: riskLevel,
            articles: articles,
            completed: true
          });
          storage.answers.individuals = {};
          $location.path('/advice');
          break;
        case 'organizations':

          break;
        default:
          break;
      }
    }

    function getArticlesIndividuals(){
      var answers  = ctrl.answers;
      var articles = [];
      //100
      if (answers['digital_navigation'] >= 4) {
        articles.push('digital_security');
        articles.push('navigation');
      }
      if (answers['digital_mail'] >= 4) {
        articles.push('digital_security');
        articles.push('mail');
      }
      if (answers['digital_chat'] >= 4) {
        articles.push('digital_security');
        articles.push('chat');
      }
      if (answers['digital_passwords'] >= 4) {
        articles.push('digital_security');
        articles.push('passwords');
      }
      if (answers['digital_calls'] >= 4) {
        articles.push('digital_security');
        articles.push('calls');
      }
      //106
      if ( answers['threat_individual'] >= 20
        || answers['threat_collegues_in'] >= 20
        || answers['threat_collegues_out'] >= 20
      ) {
        articles.push('threat');
      }
      //107
      if (answers['security_corruption'] >= 3 ) {
        articles.push('corruption');
      }
      //108
      if ( answers['security_zone'] >= 3
        && answers['profesional_protocols'] >= 3
      ) {
        articles.push('zone_protocols');
      }
      //109
      if ( answers['security_police'] >= 4
        && answers['security_corruption'] >=4
      ){
        articles.push('crime_corruption');
      }
      //110
      if ( answers['security_information'] >= 4
        && answers['security_corruption'] >=4
      ){
        articles.push('corruption_information');
      }
      //111
      if ( answers['security_information'] >= 4
        && answers['security_corruption'] >=4
        && answers['digital_mail'] >= 3
      ){
        articles.push('information_corruption_mail');
      }
      //112
      if (answers['security_violence'] >= 4) {
        articles.push('violence');
      }
      //113
      if ( answers['security_violence'] >= 4
        && answers['profesional_plan'] >= 4
      ){
        articles.push('violence_plan');
      }
      //114
      if ( answers['security_violence'] >= 4
        && answers['network_boss'] >= 4
      ){
        articles.push('violence_boss');
      }
      //115
      if ( answers['threat_collegues_in'] >= 20
        && answers['profesional_protocols'] >= 4
      ){
        articles.push('threat_protocols');
      }
      //116
      if ( answers['profesional_plan'] >= 4
        || answers['profesional_information'] >= 4
        || answers['profesional_etic'] >= 4
        || answers['profesional_protocols'] >= 4
      ){
        articles.push('professional');
      }
      //117
      if ( answers['network_boss'] >= 4
        || answers['network_sub'] >= 4
        || answers['network_collegues'] >= 4
      ){
        articles.push('network');
      }
      //118
      if (answers['profesional_plan'] >= 4){
        articles.push('plan');
      }
      //119
      if (answers['profesional_information'] >=4) {
        articles.push('information');
      }
      //120
      if (answers['profesional_etic'] >=4) {
        articles.push('etic');
      }
      //121
      if (answers['security_information'] >=4) {
        articles.push('sinformation');
      }
      return articles;
    }

    function getScoreIndividuals(){
      var score = 0;
      ctrl.questions.forEach(function(page){
        page.questions.forEach(function(question){
          if (question.score) {
            var res = ctrl.answers[question.name];
            score  += (isFinite(res) && Number(res)) || 0;
          }
        });
      });
      return score;
    }

    function getRiskLevelIndividuals(){
      var score = getScoreIndividuals();
      if (score <= 40) {
        return 'low';
      }else if (score <= 59) {
        return 'moderate';
      }else if (score <= 79) {
        return 'high';
      }else {
        return 'extreme';
      }
    }

  }
})();

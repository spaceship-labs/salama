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
    'adviceService'
  ];

  function EvaluationCtrl(
    $scope,
    $routeParams,
    $localStorage,
    $translate,
    individualsService,
    organizationsService,
    adviceService
  ) {

    var ctrl = this;
    var individuals = 'individual';
    var organizations = 'organizations';
    var finish = 'finish';
    var db = $localStorage.evaluation = $localStorage.evaluation || {};

    ctrl.questions = db.questions = db.questions || [];
    ctrl.answers = db.answers = db.answers || {};
    ctrl.answers.completed = false;
    ctrl.finishEvaluation = finishEvaluation;
    setResults();
    activate();

    function finishEvaluation(){
      ctrl.answers.completed = true;
      setResults();
    }

    function activate(){
      setState();
      $scope.$watch(getTypeLang,getEvaluation);
    }

    function getTypeLang(){
      return $routeParams.type + $translate.use();
    }

    function getEvaluation(lang){
      var type = $routeParams.type;
      var lang = $translate.use();
      if (type == individuals) {
        individualsService.getEval(lang).then(setEvaluation);
      }else if (type == organizations) {
        organizationsService.getEval(lang).then(setEvaluation);
      }
    }

    function setEvaluation(questions){
      ctrl.questions = db.questions = questions;
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

    function setResults(){
      var answers = ctrl.answers;
      var results = {};
      results.completed = answers.completed;
      results.score = getScore();
      results.riskLevel = getRiskLevel();
      //100
      if (answers['digital_navigation'] >= 4) {
        results.digital_security = true;
        results.navigation = true;
      }
      if (answers['digital_mail'] >= 4) {
        results.digital_security = true;
        results.mail = true;
      }
      if (answers['digital_chat'] >= 4) {
        results.digital_security = true;
        results.chat = true;
      }
      if (answers['digital_passwords'] >= 4) {
        results.digital_security = true;
        results.passwords = true;
      }
      if (answers['digital_calls'] >= 4) {
        results.digital_security = true;
        results.calls = true;
      }
      //106
      if ( answers['threat_individual'] >= 20
        || answers['threat_collegues_in'] >= 20
        || answers['threat_collegues_out'] >= 20
      ) {
        results.threat = true;
      }
      //107
      if (answers['security_corruption'] >= 3 ) {
        results.corruption  = true;
      }
      //108
      if ( answers['security_zone'] >= 3
        && answers['profesional_protocols'] >= 3
      ) {
        results.zone_protocols = true;
      }
      //109
      if ( answers['security_police'] >= 4
        && answers['security_corruption'] >=4
      ){
        results.crime_corruption = true;
      }
      //110
      if ( answers['security_information'] >= 4
        && answers['security_corruption'] >=4
      ){
        results.corruption_information = true;
      }
      //111
      if ( answers['security_information'] >= 4
        && answers['security_corruption'] >=4
        && answers['digital_mail']>=3
      ){
        results.information_corruption_mail = true;
      }
      //112
      if (answers['security_violence'] >= 4) {
        results.violence = true;
      }
      //113
      if ( answers['security_violence'] >= 4
        && answers['profesional_plan'] >= 4
      ){
        results.violence_plan = true;
      }
      //114
      if ( answers['security_violence'] >= 4
        && answers['network_boss'] >= 4
      ){
        results.violence_boss = true;
      }
      //115
      if ( answers['threat_collegues_in'] >= 20
        && answers['profesional_protocols'] >= 4
      ){
        results.threat_protocols = true;
      }
      //116
      if ( answers['profesional_plan'] >= 4
        || answers['profesional_information'] >= 4
        || answers['profesional_etic'] >= 4
        || answers['profesional_protocols'] >= 4
      ){
        results.professional = true;
      }
      //117
      if ( answers['network_boss'] >= 4
        || answers['network_sub'] >= 4
        || answers['network_collegues'] >= 4
      ){
        results.network = true;
      }
      //118
      if (answers['profesional_plan'] >= 4){
        results.plan = true;
      }
      //119
      if (answers['profesional_information'] >=4) {
        results.information = true;
      }
      //120
      if (answers['profesional_etic'] >=4) {
        results.etic = true;
      }
      //121
      if (answers['security_information'] >=4) {
        results.sinformation = true;
      }
      adviceService.setResults(results);
    }

    function getScore(){
      var score = 0;
      var digital_security = false;
      ctrl.questions.forEach(function(page){
        page.questions.forEach(function(question){
          if (question.score) {
            var res = ctrl.answers[question.name];
            score += ( isFinite(res) && Number(res)) || 0;
          }
        });
      });
      return score;
    }

    function getRiskLevel(){
      var score = getScore();
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


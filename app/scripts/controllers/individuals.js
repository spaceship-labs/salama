'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:IndividualsCtrl
 * @description
 * # IndividualsCtrl
 * Controller of the salamaApp
 */

(function(){
  angular.module('salamaApp')
    .controller('IndividualsCtrl', IndividualsCtrl);

  IndividualsCtrl.$inject=['$scope', '$translate','questionsService'];

  function IndividualsCtrl($scope, $translate, questionsService){

    var ctrl = this;
    ctrl.questions = [];
    ctrl.evaluation = {};
    ctrl.calculate = calculate;

    activate();

    function activate(){
      $scope.$watch(getLang,getQuestions);
    }

    function getLang(){
      return $translate.use();
    }

    function getQuestions(lang){
      questionsService.setLang(lang);
      questionsService.getEvalIndividuals().then(setQuestions);
    }

    function setQuestions(questions){
      ctrl.questions = questions;
    }

    function calculate(){
      var name = ctrl.evaluation[0];
      var mail = ctrl.evaluation[1];
      var training = ctrl.evaluation[2];
      var medium = ctrl.evaluation[3];
      var place = ctrl.evaluation[4];
      var puestos = ctrl.evaluation[5];
      var threatened_you = Number(ctrl.evaluation[6]);
      var threatened_in= Number(ctrl.evaluation[7]);
      var threatened_out = Number(ctrl.evaluation[8]);
      var security = subScore(ctrl.evaluation[9]);
      var censorship = subScore(ctrl.evaluation[10]);
      var professional = subScore(ctrl.evaluation[11]);
      var network = subScore(ctrl.evaluation[12]);
      var laboral = subScore(ctrl.evaluation[13]);
      var digital = subScore(ctrl.evaluation[14]);
      var score = (
        threatened_you + threatened_in + threatened_out +
        security + censorship + professional +
        network + laboral + digital
      );
    }

    function subScore(item){
      var score = 0;
      for(var key in item){
        score += Number(item[key]);
      }
      return score;
    }

    function riskLevel(score){
      return 'low';
    }

  }
})();

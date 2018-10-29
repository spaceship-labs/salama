'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:AdviceCtrl
 * @description
 * # AdviceCtrl
 * Controller of the salamaApp
 */
(function(){
  angular.module('salamaApp')
    .controller('AdviceCtrl', AdviceCtrl);

  AdviceCtrl.$inject = ['$scope', '$translate', 'adviceService'];

  function AdviceCtrl($scope, $translate, adviceService){
    var ctrl         = this;
    var result       = adviceService.getResultsIndividuals();
    ctrl.finalScore  = result.score;
    ctrl.digitalScore = result.digitalScore;
    ctrl.risk        = adviceService.getRiskLevelIndividuals();
    ctrl.digitalRisk = adviceService.getDigitalRiskLevelIndividuals();
    ctrl.links       = [];
    ctrl.advice      = '';
    ctrl.restartEval = restartEval;
    ctrl.printScreen = printScreen;
    activate();

    function activate(){
      $scope.$watch(getLang, setLang);
      $scope.$watch(getLang, getAdvice);
      $scope.$watch(getLang, getLinks);
    }

    function getLang(){
      return $translate.use();
    }

    function setLang(lang){
      ctrl.lang = lang;
    }

    function getAdvice(lang){
      adviceService.getAdviceIndividuals(lang).then(function(advice){
        ctrl.advice = advice;
      });
    }

    function getLinks(lang){
      adviceService.getLinksIndividuals(lang).then(function(links){
        ctrl.links = links;
      });
    }

    function printScreen(){
      console.log('print');
      window.print();
    }

    function restartEval(){
      adviceService.setResultsIndividuals({});
    }
  }
})();

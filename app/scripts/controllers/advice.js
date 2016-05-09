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
    var ctrl  = this;
    ctrl.risk = adviceService.getRiskLevel();
    ctrl.finalScore = adviceService.getScore();
    ctrl.restartEval = restartEval;
    ctrl.links = [];
    ctrl.advice = '';

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
      adviceService.getAdvice(lang).then(function(advice){
        ctrl.advice = advice;
      });
    }

    function getLinks(lang){
      adviceService.getLinks(lang).then(function(links){
        ctrl.links = links;
      });
    }

    function restartEval(){
      adviceService.setResults({});
    }
  }
})();

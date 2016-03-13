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
    ctrl.risk = {};
    ctrl.advice = '';
    ctrl.links = [];

    activate();

    function activate(){
      $scope.$watch(getLang,getRiskLevel);
      $scope.$watch(getLang,getScore);
      $scope.$watch(getLang,getLinks);
    }

    function getLang(){
      return $translate.use();
    }

    function getRiskLevel(lang){
      ctrl.risk = adviceService.getRiskLevel();
    }

    function getScore(){
      ctrl.finalScore = adviceService.getScore();
    }

    function getLinks(lang){
      ctrl.links = adviceService.getLinks(lang);
    }

  }
})();

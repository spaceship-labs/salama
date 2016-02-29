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

  AdviceCtrl.$inject = ['scoreService'];

  function AdviceCtrl(scoreService){
    var ctrl = this;
    ctrl.advice = '';

    activate();

    function activate(){
      scoreService.getAdvice().then(setAdvice);
    }

    function setAdvice(advice){
      ctrl.advice = advice;
    }
  }

})();

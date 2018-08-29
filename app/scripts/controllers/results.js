'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the salamaApp
 */
(function(){
  angular.module('salamaApp')
    .controller('ResultsCtrl', ResultsCtrl);

  ResultsCtrl.$inject = ['adviceService'];

  function ResultsCtrl(adviceService){
    var ctrl = this;
    ctrl.results = {};
    ctrl.restartEval = restartEval;

    activate();

    function activate(){
      var res     = [];
      var results = adviceService.getResultsOrganizations();
      for (var i in results){
        if (i === 'completed'){
          continue;
        }
        res.push({
          name : i,
          score: results[i].score,
          advice: results[i].advice,
          risks: results[i].each_risk,
        });
      }
      ctrl.results = res;
    }

    function restartEval(){
      adviceService.setResultsOrganizations({});
    }


  }
})();

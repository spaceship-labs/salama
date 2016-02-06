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

  IndividualsCtrl.$inject=['$scope','$translate','questionsService'];

  function IndividualsCtrl($scope,$translate,questionsService){
    var ctrl = this;
    ctrl.questions = null;
    ctrl.lang = null;

    activate();

    function activate(){
      $scope.$watch(getLang,getQuestions);
    }

    function getLang(){
      return $translate.use();
    }

    function getQuestions(lang){
      questionsService.getIndividuals(lang)
        .then(setQuestions)
        .catch(logError);
    }

    function setQuestions(questions){
      ctrl.questions=questions;
    }

    function logError(err){
      console.log(err);
    }
  }
})();

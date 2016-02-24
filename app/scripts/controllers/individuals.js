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
    ctrl.answers = [];

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

  }
})();

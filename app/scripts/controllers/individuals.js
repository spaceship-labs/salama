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

  IndividualsCtrl.$inject=['$scope', '$translate'];

  function IndividualsCtrl($scope, $translate){

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

    }

    function setQuestions(questions){

    }

  }
})();

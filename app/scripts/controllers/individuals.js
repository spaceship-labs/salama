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

  IndividualsCtrl.$inject=[];

  function IndividualsCtrl(){
    var ctrl = this;
    ctrl.questions = null;
    ctrl.lang = null;

    activate();

    function activate(){

    }

    function getLang(){

    }

    function getQuestions(lang){

    }

    function setQuestions(questions){

    }

  }
})();

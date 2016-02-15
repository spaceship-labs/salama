'use strict';

/**
 * @ngdoc service
 * @name salamaApp.questionsService
 * @description
 * # questionsService
 * Service in the salamaApp.
 */
(function(){
  angular
    .module('salamaApp')
    .factory('questionsService',questionsService);

  questionsService.$inject=[];

  function questionsService(){
    return {};
  }
})();


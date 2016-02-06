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
    .service('questionsService',questionsService);

  questionsService.$inject=['$q','$localStorage','githubService'];

  function questionsService($q,$localStorage,githubService){
    $localStorage.questionsService = $localStorage.questionsService || {};
    var db = $localStorage.questionsService;
    var github = githubService;
    return {

    };

    function getIndividuals(){
    }

    function getOrganizations(){
    }
  }
})();


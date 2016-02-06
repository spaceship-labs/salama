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
    db.individuals= db.individuals || {};
    db.organizations= db.organizations || {};
    return {
        getIndividuals: getIndividuals,
        getOrganizations: getOrganizations
    };

    function getIndividuals(lang){
      if (!db.individuals[lang]) {
        return setIndividuals(lang);
      }
      return $q.resolve(db.individuals[lang]);
    }

    function setIndividuals(lang){
      return github.getIndividuals(lang).then(function(questions){
        db.individuals[lang] = questions.questions;
        return db.individuals[lang];
      });
    }

    function getOrganizations(lang){
      if (!db.organizations[lang]) {
        return setOrganizations(lang);
      }
      return $q.resolve(db.organizations[lang]);
    }

    function setOrganizations(lang){
      return github.getOrganizations(lang).then(function(questions){
        db.organizations[lang] = questions.questions;
        return db.organizations[lang];
      });
    }
  }
})();


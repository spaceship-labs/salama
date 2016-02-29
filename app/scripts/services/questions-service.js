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

  questionsService.$inject=['$localStorage', 'contentService'];

  function questionsService($localStorage, contentService){

    var db      = $localStorage.questions = $localStorage.questions || {};
    db.individuals = db.individuals || {};
    db.organizations = db.organizations || {};
    db.version  = db.version || '';
    db.lang     = db.lang || 'en_US';

    return {
      getIndividuals: getIndividuals,
      getOrganizations: getOrganizations
    };

    function getIndividuals(newlang){
      setLang(newlang);
      return contentService.getVersion()
        .then(resolveVersion)
        .then(resolveIndividuals);
    }

    function getOrganizations(newlang){
      setLang(newlang);
      return contentService.getVersion()
        .then(resolveVersion)
        .then(resolveOrganizations);
    }

    function resolveVersion(newversion){
      if (newversion != db.version){
        db.version = newversion;
        return true;
      }
      return false;
    }

    function resolveIndividuals(newversion){
      if (!db.individuals[db.lang] || newversion){
        return contentService.getEvalIndividuals(db.lang).then(setIndividuals);
      }
      return db.individuals[db.lang];
    }

    function resolveOrganizations(newversion){
      if (!db.organizations[db.lang] || newversion){
        return contentService.getEvalOrganizations(db.lang).then(setOrganizations);
      }
      return db.organizations[db.lang];
    }

    function setIndividuals(evaluation){
      db.individuals[db.lang] = evaluation;
      return evaluation;
    }

    function setOrganizations(evaluation){
      db.organizations[db.lang] = evaluation;
      return evaluation;
    }

    function setLang(newlang){
      db.lang = newlang;
    }

  }
})();


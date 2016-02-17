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

    var db;
    $localStorage.questionsService = $localStorage.questionsService || {};
    db = $localStorage.postService;
    db.individuals = db.individuals || {};
    db.organizations = db.organizations || {};

    return {
      getIndividuals: getIndividuals,
      getOrganizations: getOrganizations,
      setLang: setLang
    };

    function getIndividuals(){
      return existsNewVersion().then(resolveIndividuals);
    }

    function getOrganizations(){
      return existsNewVersion().then(resolveOrganizations);
    }

    function setLang(lang){
      db.lang = lang;
    }

    function existsNewVersion(){
      return contentService.getVersion()
        .then(validateNewVersion);
    }

    function validateNewVersion(version){
      if (!db.version || db.version != version){
        db.version = version;
        return true;
      }
      return false;
    }

    function resolveIndividuals(mustDownload){
      if (!db.individuals[db.lang] || mustDownload){
        return contentService.getEvalIndividuals(db.lang).then(function(individuals){
          db.individuals[db.lang] = individuals;
          return individuals;
        });
      }
      return db.individuals[lang];
    }

    function resolveOrganizations(mustDownload){
      if (!db.organizations[db.lang] || mustDownload){
        return contentService.getEvalOrganizations(db.lang).then(function(organizations){
          db.organizations[db.lang] = organizations;
          return organizations;
        });
      }
      return db.organizations[lang];
    }
  }
})();


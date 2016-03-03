'use strict';

/**
 * @ngdoc service
 * @name salamaApp.organizationsService
 * @description
 * # organizationsService
 * Service in the salamaApp.
 */
(function(){
  angular.module('salamaApp')
    .service('organizationsService', organizationsService);

  organizationsService.$inject = ['$localStorage', 'contentService'];

  function organizationsService($localStorage, contentService){

    var db = $localStorage.organizations = $localStorage.organizations || {};

    db.metadata   = db.metadata || {};
    db.version    = db.version || '';
    db.lang       = db.lang || 'en_US';
    db.evaluation = db.evaluation || {};


    return {
      getEval: getEval
    }

    function getEval(lang){
      setLang(lang);
      return contentService.getVersion()
        .then(resolveVersion)
        .then(resolveEval);
    }

    function resolveVersion(newversion){
      if (db.version != newversion) {
        db.version = newversion;
        return true;
      }
      return false;
    }

    function resolveEval(newversion){
      if (!db.evaluation[db.lang] || newversion){
        return contentService.getEvalOrganizations(db.lang)
          .then(setEval);
      }
      return db.evaluation[db.lang];
    }

    function setEval(evaluation){
      db.evaluation[db.lang] = evaluation;
      return evaluation;
    }

    function setLang(newlang){
      db.lang = newlang;
    }

  }

})();

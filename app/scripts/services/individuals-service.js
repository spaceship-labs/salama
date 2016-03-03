'use strict';

/**
 * @ngdoc service
 * @name salamaApp.individualsService
 * @description
 * # individualsService
 * Service in the salamaApp.
 */
(function(){
  angular.module('salamaApp')
    .service('individualsService', individualsService);

  individualsService.$inject = ['$localStorage', 'contentService'];

  function individualsService($localStorage, contentService){

    var db = $localStorage.individuals = $localStorage.individuals || {};

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
        return contentService.getEvalIndividuals(db.lang)
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

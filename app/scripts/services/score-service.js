'use strict';

/**
 * @ngdoc service
 * @name salamaApp.scoreService
 * @description
 * # scoreService
 * Service in the salamaApp.
 */
(function(){
  angular.module('salamaApp')
    .factory('scoreService', scoreService);

  scoreService.$inject = ['$localStorage', 'contentService'];

  function scoreService($localStorage, contentService){

    var db = $localStorage.score = $localStorage.score || {};
    db.lang = db.lang || 'en_US';
    db.advices = db.advices || {};

    return {
      getRiskLevel: getRiskLevel,
      getAdvice: getAdvice
    };

    function getRiskLevel(score){
      if (score <= 40) {
        return 'low';
      }
      if (score <= 59) {
        return 'mid';
      }
      if (score <= 79) {
        return 'high';
      }
      return 'extreme';
    }

    function getAdvice(score, lang){
      var riskLevel = getRiskLevel(score);
      setLang(lang);
      setRiskLevel(riskLevel);
      return resolveVersion().then(resolveAdvice);
    }

    function resolveVersion(newversion){
      if (db.version != newversion) {
        db.version = newversion;
        return true;
      }
      return false;
    }

    function resolveAdvice(newversion){
      if (!db.advices[db.lang] || !db.advices[db.lang][db.risk] || newversion) {
        return contentService.getAdvice(db.risk,lang).then(setAdvice);
      }
      return db.advices[db.lang][db.risk];
    }

    function setLang(lang){
      db.lang = lang;
    }

    function setRiskLevel(riskLevel){
      db.risk = riskLevel
    }

  }
})();

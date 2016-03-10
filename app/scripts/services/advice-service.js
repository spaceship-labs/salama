'use strict';

/**
 * @ngdoc service
 * @name salamaApp.adviceService
 * @description
 * # adviceService
 * Service in the salamaApp.
 */
(function(){
  angular.module('salamaApp')
    .factory('adviceService', adviceService);

  adviceService.$inject = ['$localStorage', 'contentService'];

  function adviceService($localStorage, contentService){

    var db = $localStorage.advice = $localStorage.advice || {};
    db.lang = db.lang || 'en_US';
    db.advices = db.advices || {};

    return {
      setLang: setLang,
      getAdvice: getAdvice
    };

    function getAdvice(riskLevel){
      setRiskLevel(riskLevel);
      return contentService.getVersion()
        .then(resolveVersion)
        .then(resolveAdvice);
    }

    function resolveVersion(newversion){
      if (db.version != newversion) {
        db.version = newversion;
        return true;
      }
      return false;
    }

    function resolveAdvice(newversion){;
      var risk = db.risk;
      var lang = db.lang;
      if (!db.advices[lang] || !db.advices[lang][risk] || newversion) {
        return contentService.getAdvice(risk, lang).then(setAdvice);
      }
      return db.advices[lang][risk];
    }

    function setAdvice(newadvice){
      db.advices[db.lang] = db.advices[db.lang] || {};
      db.advices[db.lang][db.risk] = newadvice;
      return newadvice;
    }

    function setRiskLevel(level){
      db.risk = level;
    }

    function setLang(newlang){
      db.lang = newlang;
    }

  }
})();

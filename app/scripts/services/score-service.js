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
    db.score = db.score || 0;

    return {
      setScore: setScore,
      setLang: setLang,
      getRiskLevel: getRiskLevel,
      getAdvice: getAdvice
    };

    function getRiskLevel(){
      var score = db.score;
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

    function getAdvice(){
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

    function resolveAdvice(newversion){
      var risk = getRiskLevel(db.score);
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

    function setLang(newlang){
      db.lang = newlang;
    }

    function setScore(newscore){
      db.score = newscore
    }

  }
})();

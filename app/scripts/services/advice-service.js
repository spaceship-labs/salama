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
    var risks;
    var lang ;

    db.results = db.results || {};

    risks = {
      extreme : {
        level       : 'views.evaluation.extremerisk',
        image       : 'images/riesgo_extremo.jpg',
        description : 'views.evaluation.extremeadvice',
        advice: 'extreme'
      },
      high    : {
        level       : 'views.evaluation.highrisk',
        image       : 'images/riesgo_alto.jpg',
        description  : 'views.evaluation.highadvice',
        advice: 'high'
      },
      moderate  : {
        level       : 'views.evaluation.moderaterisk',
        image       : 'images/riesgo_medio.jpg',
        description : 'views.evaluation.moderateadvice',
        advice: 'moderate'
      },
      low     : {
        level       : 'views.evaluation.lowrisk',
        image       : 'images/riesgo_bajo.jpg',
        description : 'views.evaluation.lowadvice',
        advice: 'low'
      }
    };

    return {
      setResults : setResults,
      getLinks: getLinks,
      getScore : getScore,
      getRiskLevel: getRiskLevel
    };


    function getLinks(lang){
      setLang(lang);
      var links = [];
      for (var article in db.results){
        if (article == 'score' || article == 'riskLevel'){
          continue;
        }
        links.push({
          title: article,
          link:  article,
        });
      }
      return links;
    }

    function getScore(lang){
      setLang(lang);
      return db.results.score;
    }

    function getRiskLevel(lang){
      setLang(lang);
      return risks[db.results.riskLevel];
    }

    function setResults(results){
      db.results = results;
    }

    function setLang(newLang){
      lang = newLang;
    }
  }
})();

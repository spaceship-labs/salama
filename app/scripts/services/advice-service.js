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

  adviceService.$inject = [
    '$localStorage',
    'contentService',
    'metadataService'
  ];

  function adviceService($localStorage, contentService, metadataService){

    var db = $localStorage.advice = $localStorage.advice || {};
    var risks;

    db.results = db.results || {};

    risks = {
      extreme  : {
        level       : 'views.evaluation.extremerisk',
        image       : 'images/riesgo_extremo.jpg',
        description : 'views.evaluation.extremeadvice',
        advice      : 'extreme'
      },
      high     : {
        level       : 'views.evaluation.highrisk',
        image       : 'images/riesgo_alto.jpg',
        description : 'views.evaluation.highadvice',
        advice      : 'high'
      },
      moderate : {
        level       : 'views.evaluation.moderaterisk',
        image       : 'images/riesgo_medio.jpg',
        description : 'views.evaluation.moderateadvice',
        advice      : 'moderate'
      },
      low      : {
        level       : 'views.evaluation.lowrisk',
        image       : 'images/riesgo_bajo.jpg',
        description : 'views.evaluation.lowadvice',
        advice      : 'low'
      }
    };

    return {
      setResults   : setResults,
      getResults   : getResults,
      getAdvice    : getAdvice,
      getLinks     : getLinks,
      getScore     : getScore,
      getRiskLevel : getRiskLevel
    };


    function getResults(){
      return db.results;
    }
    function getAdvice(lang){
      var riskLevel = getRiskLevel();
      return contentService.getAdvice(riskLevel.advice, lang);
    }

    function getLinks(lang){
      return metadataService.getMetadata(lang).then(resolveLinks);
    }

    function resolveLinks(metadata){
      var links = [];
      var titles = {};
      metadata.forEach(function(post){
        titles[post.path] = post.title;
      });
      for (var article in db.results){
        if (article == 'score' || article == 'riskLevel' || article == 'completed'){
          continue;
        }
        links.push({
          title :  titles[article],
          link  :  article,
        });
      }
      return links;
    }

    function getScore(){
      return db.results.score;
    }

    function getRiskLevel(){
      return risks[db.results.riskLevel];
    }

    function setResults(results){
      db.results = results;
    }

  }
})();

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
    var store = $localStorage.adviceService = $localStorage.adviceService || {
      individuals: {
        results: {
        }
      },
      organizations: {
        results: {
        }
      }
    };
    var risks = {
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
      setResultsIndividuals: setResultsIndividuals,
      getResultsIndividuals: getResultsIndividuals,
      getRiskLevelIndividuals: getRiskLevelIndividuals,
      getLinksIndividuals: getLinksIndividuals,
      getAdviceIndividuals: getAdviceIndividuals
    };

    function getResultsIndividuals(){
      return store.individuals.results;
    }

    function setResultsIndividuals(results){
      store.individuals.results = results;
    }

    function getLinksIndividuals(lang){
      return metadataService.getMetadata(lang).then(function(metadata){
        var links = [];
        var titles = {};
        var rlinks = store.individuals.results.articles;
        metadata.forEach(function(post){
          titles[post.path] = post.title;
        });
        for (var i = 0; i < rlinks.length; i++){
          var article = rlinks[i];
          links.push({
            title :  titles[article],
            link  :  article,
          });
        }
        return links;
      });
    }

    function getAdviceIndividuals(lang){
      var riskLevel = risks[store.individuals.results.riskLevel];
      return contentService.getAdvice(riskLevel.advice, lang);
    }

    function getRiskLevelIndividuals(lang){
       return risks[store.individuals.results.riskLevel];
    }

  }
})();

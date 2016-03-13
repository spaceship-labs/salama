'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:AdviceCtrl
 * @description
 * # AdviceCtrl
 * Controller of the salamaApp
 */
(function(){
  angular.module('salamaApp')
    .controller('AdviceCtrl', AdviceCtrl);

  AdviceCtrl.$inject = [];

  function AdviceCtrl(){
    var ctrl = this;
      var links = {
      es_MX:{
        low: {
          title: 'Riesgo bajo',
          link: 'es_MX/low.md'
        },
        mid: {
          title: 'Riesgo moderado',
          link:'es_MX/moderate.md'
        },
        high: {
          title: 'Riesgo alto',
          link:'es_MX/high.md'
        },
        extreme: {
          title: 'Riesgo extremo',
          link: 'es_MX/extreme.md'
        }
      },
      en_US:{
        low: {
          title: 'Low risk',
          link: 'en_US/low.md'
        },
        mid: {
          title: 'Moderate risk',
          link:'en_US/moderate.md'
        },
        high: {
          title: 'High Risk',
          link:'en_US/high.md'
        },
        extreme: {
          title: 'Extreme Risk',
          link: 'en_US/extreme.md'
        }
      }
    };

    var risks = {
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
      medium  : {
        level       : 'views.evaluation.midrisk',
        image       : 'images/riesgo_medio.jpg',
        description : 'views.evaluation.midadvice',
        advice: 'moderate'
      },
      low     : {
        level       : 'views.evaluation.lowrisk',
        image       : 'images/riesgo_bajo.jpg',
        description : 'views.evaluation.lowadvice',
        advice: 'low'
      }
    };

    ctrl.risk = risks.low;

  }

})();

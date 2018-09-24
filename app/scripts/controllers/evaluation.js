'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:EvaluationCtrl
 * @description
 * # EvaluationCtrl
 * Controller of the salamaApp
 */
(function(){
  angular.module('salamaApp')
    .controller('EvaluationCtrl', EvaluationCtrl);

  EvaluationCtrl.$inject = [
    '$scope',
    '$location',
    '$routeParams',
    '$translate',
    '$localStorage',
    '$http',
    'individualsService',
    'organizationsService',
    'adviceService'
  ];

  function EvaluationCtrl(
    $scope,
    $location,
    $routeParams,
    $translate,
    $localStorage,
    $http,
    individualsService,
    organizationsService,
    adviceService
  ) {
    var ctrl    = this;
    var storage = $localStorage.evaluationCtrl = $localStorage.evaluationCtrl || {
      answers: {
        individuals: {},
        organizations: {}
      }
    };

    ctrl.type      = $routeParams.type;
    ctrl.questions = [];
    ctrl.answers   = {};
    ctrl.page      = 0;
    ctrl.finish    = finish;


    activate();

    function activate(){
      $scope.$watch(getLang, setQuestions);
    }

    function getLang(){
      return $translate.use();
    }

    function setQuestions(lang){
      ctrl.page = 1;
      switch (ctrl.type) {
        case 'individual':
          var completed = adviceService.getResultsIndividuals().completed;
          if (completed) {
            $location.path('/advice');
          }
          individualsService.getEval(lang).then(function(questions){
              ctrl.questions = questions;
              ctrl.answers   = storage.answers.individuals;
          });
          break;
        case 'organizations':
          var completed = adviceService.getResultsOrganizations().completed;
          if (completed) {
            $location.path('/results');
          }
          organizationsService.getEval(lang).then(function(questions){
            ctrl.questions = questions;
            ctrl.answers   = storage.answers.organizations;
          });
          break;
        case 'journalists':
        case 'defenders':
          var completed = adviceService.getResultsIndividuals().completed;
          if (completed) {
            $location.path('/advice');
          }
          individualsService.getEval(lang, ctrl.type).then(function(questions){
              ctrl.questions = questions;
              ctrl.answers   = storage.answers.individuals;
          });
          break;
        default:
          ctrl.page = 0;
          break
      }
    }

    function finish(){
      switch (ctrl.type) {
        case 'individual':
          var score     = getScoreIndividuals();
          var digitalScore = getDigitalScore();
          var riskLevel = getRiskLevelIndividuals();
          var articles  = getArticlesIndividuals();
          var digitalRiskLevel = getDigitalRiskLevel();
          adviceService.setResultsIndividuals({
            score: score,
            digitalScore : digitalScore,
            riskLevel: riskLevel,
            digitalRiskLevel : digitalRiskLevel,
            articles: articles,
            completed: true
          });
          storage.answers.individuals = {};

          var infoSurvey = getFormatInfoSurvey();
          infoSurvey.score = score;
          infoSurvey.risk = riskLevel;
          infoSurvey.type = 'individual';
          saveSurvey(infoSurvey).then(function(res) {
            $location.path('/advice');
          });
          break;
        case 'organizations':
          var infoSurvey = getFormatInfoSurvey();
          infoSurvey.type = 'organization';

          var results = getResultsOrganizations();

          results.completed = true;
          adviceService.setResultsOrganizations(results);
          storage.answers.organizations = {};

          infoSurvey.results = results;
          saveSurvey(infoSurvey).then(function(res) {
            $location.path('/results');
          });

          break;
        case 'journalists':
        case 'defenders':
          var score     = getScoreIndividuals();
          var digitalScore = getDigitalScore();
          score -= digitalScore;
          var riskLevel = getRiskLevel(score, ctrl.type);
          var articles  = getArticlesIndividualsByType();
          var digitalRiskLevel = getRiskLevel(digitalScore, 'digital_'+ctrl.type);


          adviceService.setResultsIndividuals({
            score: score,
            digitalScore : digitalScore,
            riskLevel: riskLevel,
            digitalRiskLevel : digitalRiskLevel,
            articles: articles,
            completed: true
          });
          storage.answers.individuals = {};


          var infoSurvey = getFormatInfoSurvey();
          infoSurvey.score = score;
          infoSurvey.risk = riskLevel;
          infoSurvey.type = 'individual-'+ctrl.type;
          saveSurvey(infoSurvey).then(function(res) {
            $location.path('/advice');
          });
          break;
        default:
          break;
      }
    }

    function getArticlesIndividualsByType() {
      var articles = [];
      //TODO move list to service...
      var list = [
      //defenders new..
      {
        answers: ['gender'],
        scores: [4],
        article: '2018-09-19-women'
      },

      {
        answers: ['minority'],
        scores: [2],
        exact: true,
        article: '2018-09-19-vulnerables'
      },

      {
        answers: ['minority'],
        scores: [3],
        exact: true,
        article: '2018-09-19-diversidad'
      },

      {
        answers: ['threat_collegues'],
        scores: [5],
        exact: true,
        article: '2018-09-19-ambiente-hostil'
      },

      {
        answers: ['censorship_inemotional_attention'],
        scores: [4],
        article: '2018-09-19-autocuidado'
      },
      {
        answers: ['profesional_information'],
        scores: [4],
        article: 'zone_protocols'
      },
      {
        answers: ['security_police', 'security_zone', 'security_information'],
        scores: [3, 3, 3],
        article: '2018-09-19-abusos'
      },
      {
        answers: ['network_collegues_in'],
        scores: [4],
        article: 'network'
      },



      {
        answers: ['digital_navigation', 'digital_mail', 'digital_chat', 'digital_passwords'],
        scores: [10, 10, 10, 10],
        article: 'digital_security',
        articles: ['navigation', 'mail', 'chat', 'passwords']
      },
      {
        //threat_collegues {threat_collegues_in, threat_collegues_out}
        answers: ['threat_individual', 'threat_collegues' ],
        scores: [4, 4, 4],
        article: 'threat'
      },{
        //no aplica para defenders...
        answers: ['security_corruption'],
        scores: [3],
        article: 'corruption'
      }, {
        answers: ['security_zone'],
        scores: [3],
        article: 'zone_protocols'
      }, {
        answers: ['security_police'],
        scores: [3],
        article: 'crime_corruption'
      }, {
        answers: ['security_information'],
        scores: [2],
        article: 'corruption_information'
      }, {
        answers: ['security_information', 'digital_mail'],
        scores: [2, 4],
        article: 'information_corruption_mail'
      }, {
        answers: ['threat_collegues', 'profesional_protocols'],
        scores: [3, 4],
        article: 'threat_protocols'
      }, {
        answers: ['profesional_plan', 'profesional_information', 'profesional_etic'],
        scores: [3, 3, 3],
        article: 'professional'
      }, {
        answers: ['threat_collegues'],
        scores: [3],
        article: 'network'
      }, {
        answers: ['profesional_plan'],
        scores: [4],
        article: 'plan'
      }, {
        answers: ['profesional_information'],
        scores: [3],
        article: 'information'
      }, {
        answers: ['profesional_etic'],
        scores: [4],
        article: 'etic'
      }, {
        answers: ['security_information'],
        scores: [3],
        article: 'sinformation'
      }];

      list.forEach(function(l) {
        l.answers.forEach(function(answer, i) {
          var added = false;
          if (l.exact && ctrl.answers[answer] == l.scores[i]){
            added = true;
          }

          if (!l.exact && ctrl.answers[answer] >= l.scores[i]) {
            added = true;
          }
          if (added) {
            if (articles[articles.length-1] !== l.article) {
              articles.push(l.article);
            }
            if (l.articles) {
              articles = articles.concat(l.articles[i]);
            }
          }
        });
      });

      console.log('articles', articles);
      return articles;
    }

    function getArticlesIndividuals(){
      var answers  = ctrl.answers;
      var articles = [];
      //100
      if (answers['digital_navigation'] >= 4) {
        articles.push('digital_security');
        articles.push('navigation');
      }
      if (answers['digital_mail'] >= 4) {
        articles.push('digital_security');
        articles.push('mail');
      }
      if (answers['digital_chat'] >= 4) {
        articles.push('digital_security');
        articles.push('chat');
      }
      if (answers['digital_passwords'] >= 4) {
        articles.push('digital_security');
        articles.push('passwords');
      }
      if (answers['digital_calls'] >= 4) {
        articles.push('digital_security');
        articles.push('calls');
      }
      //106
      if ( answers['threat_individual'] >= 20
        || answers['threat_collegues_in'] >= 20
        || answers['threat_collegues_out'] >= 20
      ) {
        articles.push('threat');
      }
      //107
      if (answers['security_corruption'] >= 3 ) {
        articles.push('corruption');
      }
      //108
      if ( answers['security_zone'] >= 3
        && answers['profesional_protocols'] >= 3
      ) {
        articles.push('zone_protocols');
      }
      //109
      if ( answers['security_police'] >= 4
        && answers['security_corruption'] >=4
      ){
        articles.push('crime_corruption');
      }
      //110
      if ( answers['security_information'] >= 4
        && answers['security_corruption'] >=4
      ){
        articles.push('corruption_information');
      }
      //111
      if ( answers['security_information'] >= 4
        && answers['security_corruption'] >=4
        && answers['digital_mail'] >= 3
      ){
        articles.push('information_corruption_mail');
      }
      //112
      if (answers['security_violence'] >= 4) {
        articles.push('violence');
      }
      //113
      if ( answers['security_violence'] >= 4
        && answers['profesional_plan'] >= 4
      ){
        articles.push('violence_plan');
      }
      //114
      if ( answers['security_violence'] >= 4
        && answers['network_boss'] >= 4
      ){
        articles.push('violence_boss');
      }
      //115
      if ( answers['threat_collegues_in'] >= 20
        && answers['profesional_protocols'] >= 4
      ){
        articles.push('threat_protocols');
      }
      //116
      if ( answers['profesional_plan'] >= 4
        || answers['profesional_information'] >= 4
        || answers['profesional_etic'] >= 4
        || answers['profesional_protocols'] >= 4
      ){
        articles.push('professional');
      }
      //117
      if ( answers['network_boss'] >= 4
        || answers['network_sub'] >= 4
        || answers['network_collegues'] >= 4
      ){
        articles.push('network');
      }
      //118
      if (answers['profesional_plan'] >= 4){
        articles.push('plan');
      }
      //119
      if (answers['profesional_information'] >=4) {
        articles.push('information');
      }
      //120
      if (answers['profesional_etic'] >=4) {
        articles.push('etic');
      }
      //121
      if (answers['security_information'] >=4) {
        articles.push('sinformation');
      }
      return articles;
    }

    //Returns int with score from 4- 20 that represents the score for the digital security questions
    function getDigitalScore(){
      var questions = ["digital_navigation","digital_mail","digital_chat","digital_passwords","digital_calls"];
      var score = 0;
      questions.forEach(function(question){
        score += ctrl.answers[question];
      });
      return score;
    }

    function getScoreIndividuals(){
      var score = 0;
      ctrl.questions.forEach(function(page){
        page.questions.forEach(function(question){
          if (question.score) {
            var res = ctrl.answers[question.name];
            score  += (isFinite(res) && Number(res)) || 0;
          }
        });
      });
      return score;
    }

    function getFormatInfoSurvey() {
      var info = {
        answers: {},
        user: {},
      };
      ctrl.questions.forEach(function(page){
        page.questions.forEach(function(question){
          var res = ctrl.answers[question.name];
          if (question.score) {
            info.answers[question.name] = (isFinite(res) && Number(res)) || 0;
          } else if (res){
            if (question.name == 'location') {
              res = {
                formatted_address: res.formatted_address,
                geometry: res.geometry,
                id: res.id,
                name: res.name,
                place_id: res.place_id,
                url: res.url
              };
            }
            info.user[question.name] = res;

          }
        });
      });

      return info;
    }


    //TODO move to service...
    var riskLevels = {
      'journalists': {
        low: 40,
        moderate: 60,
        high: 80,
        extreme: 100
      },
      'digital_journalists': {
        low: 25,
        moderate: 50,
        high: 75,
        extreme: 100
      },
      'defenders': {
        low: 40,
        moderate: 60,
        high: 80,
        extreme: 100
      },
      'digital_defenders': {
        low: 25,
        moderate: 50,
        high: 75,
        extreme: 100
      }
    };
    function getRiskLevel(score, name) {
      var type = riskLevels[name];
      var level = Object.keys(type).filter(function(key){
        if (score <= type[key]) {
          return true;
        }
      });

      return level[0] || 'extreme';
    }

    function getRiskLevelIndividuals(){
      var score = getScoreIndividuals();
      if (score <= 40) {
        return 'low';
      }else if (score <= 59) {
        return 'moderate';
      }else if (score <= 79) {
        return 'high';
      }else {
        return 'extreme';
      }
    }

    function getDigitalRiskLevel(){
      var score = getDigitalScore();
      if (score <= 10) {
        return 'low';
      }else if (score <= 15) {
        return 'moderate';
      }else if (score <= 20) {
        return 'high';
      }else {
        return 'extreme';
      }
    }

    function getResultsOrganizations(){
      var riskMatrix = [
        ['adequately', 'adequately', 'potentially_over', 'potentially_over', 'potentially_over'],
        ['potentially_poorly', 'adequately', 'potentially_over', 'potentially_over', 'potentially_over'],
        ['potentially_poorly', 'adequately', 'potentially_over', 'potentially_over', 'potentially_over'],
        ['poorly', 'potentially_poorly', 'adequately', 'potentially_over', 'potentially_over'],
        ['poorly', 'potentially_poorly', 'adequately', 'adequately', 'potentially_over'],
        ['poorly', 'poorly', 'potentially_poorly', 'adequately', 'potentially_over'],
        ['poorly', 'poorly', 'potentially_poorly', 'adequately', 'adequately'],
        ['poorly', 'poorly', 'poorly', 'potentially_poorly', 'adequately'],
        ['poorly', 'poorly', 'poorly', 'potentially_poorly', 'adequately']
      ];
      var weights = [
        ctrl.answers['select_financial'] || 0,
        ctrl.answers['select_physical']  || 0,
        ctrl.answers['select_reputational'] || 0,
      ];
      var acum   = weights.reduce(function(acum, current) { return acum + current }, 0);
      weights    = weights.map(function(w) { return 0.6 * (w / acum);});
      weights    = [0.20, 0.20].concat(weights);
      acum       = weights.reduce(function(acum, current) { return acum + current }, 0);
      weights    = weights.map(function(w) { return w / acum; });
      var events = [
        'probability',
        'time',
        'financial',
        'physical',
        'reputation'
      ];
      var variables = [
        'murder',
        'dissapear',
        'kidnapping',
        'torture',
        'coups',
        'stole',
        'thread_death',
        'defamation',
        'verbal_attack',
        'espionage',
        'hacking',
        'ciber_attack',
        'ddos_attack',
        'media_attack',
        'sexual_attack',
        'information_obstacle'
      ];
      var keys = variables.map(function(variable){
        return events.map(function(ev){
          var key = ev + '_' + variable;
          return key;
        });
      });
      var keys_control = variables.map(function(variable){
        return events.map(function(ev){
          var key = ev + '_control_' + variable;
          return key;
        });
      });
      var results = {};
      for (var i = 0; i < keys.length; i++){
        var vkeys = keys[i].map(function(key){
          return ctrl.answers[key] || 0;
        });
        var vkeys_control = keys_control[i].map(function(key){
          return ctrl.answers[key] || 0;
        });
        var vkeys_percent = vkeys_control.map(function(vk) {
          if (vk == 5) {
            return 0.95;
          }
          return 0.25 * (vk - 1);
        });
        var each_risk     = vkeys.map(function(vk, i) {
          return vk - (vk * vkeys_percent[i]);
        });
        var row      = dotV(vkeys, weights) - 2;
        var col      = dotV(vkeys_control, weights) - 1;
        row = Math.round(row);
        col = Math.round(col);
        if (row < 0 ) {
          row = 0;
        }
        if (col < 0) {
          col = 0;
        }
        if (riskMatrix && riskMatrix[row]) {
          var advice   = riskMatrix[row][col];
          var sumatory = sumV(vkeys);
          results[variables[i]] = {
            score: sumatory,
            advice: advice,
            each_risk: each_risk
          };
        }
      }
      return results;
    }

    function dotV(V1, V2){
      var sum = 0;
      for (var i = 0; i < V1.length; i++){
        sum += V1[i] * V2[i];
      }
      return sum
    }

    function multV(V1, V2) {
      var VR = V1.map(function(term, index) {
        return term * V2[index];
      });
      var acum = VR.reduce(function(acum, c) { return acum + c; }, 0);
      return VR.map(function(c) { return c / acum; });
    }

    function sumV(V1){
      return V1.reduce(function(a, b){
        return a + b;
      });
    }

    function saveSurvey(data) {
      return $http.post('https://salama-api.herokuapp.com/survey', data);
    }

  }
})();

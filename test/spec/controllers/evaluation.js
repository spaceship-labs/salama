'use strict';

describe('Controller: EvaluationCtrl', function () {
  var scope;
  var httpBackend;
  var EvaluationCtrl;
  var random_string = 'random_string';
  var urlResources = 'resources/locale-en_US.json';
  var urlSite = 'https://raw.githubusercontent.com/spaceship-labs/salama-content/gh-pages/';
  var urlVersion = urlSite + 'version.txt';
  var urlQuestions = urlSite + 'questions/en_US/individuals.json';
  var urlApi = 'http://salama-api.herokuapp.com/survey';


  beforeEach(module('salamaApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    EvaluationCtrl = $controller('EvaluationCtrl', {
      $scope: scope
    });
    httpBackend = $httpBackend;
  }));

  it('the type must be initially undefined ', function () {
    var type = EvaluationCtrl.type;
    expect(type).to.be.undefined;
  });

  it('the type should equals individuals ', function () {
    var type;
    EvaluationCtrl.setType(EvaluationCtrl.individuals);
    type = EvaluationCtrl.type;
    expect(type).to.be.equal(EvaluationCtrl.individuals);
  });

  it('it should be 0% completed and must be always the user sets a new type', function () {
    EvaluationCtrl.setType('individuals');
    expect(EvaluationCtrl.completed).to.equal(0);
    EvaluationCtrl.completed = 10;
    EvaluationCtrl.setType('organizations');
    expect(EvaluationCtrl.completed).to.equal(0);
  });

  it('page should start on page 0, when the user chooses a type, page must be 1 , when he finish the evaluation, page must be 2',function(){
    expect(EvaluationCtrl.page).to.equal(0);
    EvaluationCtrl.setType(EvaluationCtrl.individuals);
    expect(EvaluationCtrl.page).to.equal(1);
    EvaluationCtrl.finishEvaluation();
    expect(EvaluationCtrl.page).to.equal(2);
  })

  it('it should have setted valid questions',function(){
    httpBackend.whenGET(urlVersion).respond(random_string);
    httpBackend.whenGET(urlResources).respond(random_string);
    httpBackend.whenGET(urlQuestions).respond({
      "pages": [
        {
          "type": "one-column" ,
          "questions":[
            {
              "name": "name",
              "input":"text",
              "title":"Nombre",
              "instruction":"Si quiere permanecer anónimo, no llenes el espacio del nombre. Necesitamos tu correo electrónico para enviarte los resultado . Si deseas recibir consejo individual, por favor escribe tu nombre"
            },
            {
              "name": "email",
              "input": "email",
              "title": "Correo Electrónico",
              "instruction": "Por favor escribe tu correo electrónico, (Los resultados serán enviados a este correo electrónico)."
            }
          ]
        }
      ]
    });
    expect(EvaluationCtrl.questions).to.be.empty;
    EvaluationCtrl.setType(EvaluationCtrl.individuals);
    httpBackend.flush();
    expect(EvaluationCtrl.questions.length).to.equal(1);
  });

  it('Before finish the individuals evaluation answers must be valid', function () {
    httpBackend.whenGET(urlVersion).respond(random_string);
    httpBackend.whenGET(urlResources).respond(random_string);
    httpBackend.whenGET(urlQuestions).respond({
      "pages": [
        {
          "type": "one-column" ,
          "questions":[
            {
              "name": "name",
              "input":"text",
              "title":"Nombre",
              "instruction":"Si quiere permanecer anónimo, no llenes el espacio del nombre. Necesitamos tu correo electrónico para enviarte los resultado . Si deseas recibir consejo individual, por favor escribe tu nombre"
            },
            {
              "name": "email",
              "input": "email",
              "title": "Correo Electrónico",
              "instruction": "Por favor escribe tu correo electrónico, (Los resultados serán enviados a este correo electrónico)."
            }
          ]
        }
      ]
    });
    EvaluationCtrl.setType(EvaluationCtrl.individuals);
    httpBackend.flush();
    httpBackend.when('POST', urlApi,
      function(postData) {
        console.log(postData);
        return true;
      }
    ).respond(200, true);
    EvaluationCtrl.questions.forEach(function(page){
      page.questions.forEach(function(question){
        EvaluationCtrl.answers[question.name] = random_string;
      });
    });
    expect(EvaluationCtrl.answers).to.deep.equal({name: random_string, email: random_string});
    EvaluationCtrl.finishEvaluation();
    httpBackend.flush();
  });

   it('Before finish the individuals evaluation answers must be valid', function () {
    expect(true).to.be.false;
  });

});



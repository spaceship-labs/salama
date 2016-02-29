'use strict';

describe('Service: questionsService', function () {

  var urlSite      = 'https://raw.githubusercontent.com/spaceship-labs/salama-content/gh-pages/';
  var urlResources = 'resources/locale-en_US.json';
  var urlVersion   = urlSite + 'version.txt';
  var urlIndividuals = urlSite + 'questions/en_US/individuals.json';
  var urlOrganizations = urlSite + 'questions/en_US/organizations.json';
  var someRandomString = 'some_random_string';
  var questionsService;
  var httpBackend;
  var db;


  beforeEach(module('salamaApp'));

  beforeEach(inject(function (_questionsService_, $httpBackend, $localStorage) {
    questionsService = _questionsService_;
    httpBackend = $httpBackend;
    db = $localStorage;
  }));

  it('should dowloand the individual\'s evaluation in english', function () {
    httpBackend.whenGET(urlResources).respond('randomstr');
    httpBackend.whenGET(urlVersion).respond('some_random_string');
    httpBackend.whenGET(urlIndividuals).respond({
      "questions": [{
        "question": "Nombre",
        "instruction": "Si quiere permanecer anónimo",
        "type": "text"
      }]
    });
    questionsService.getIndividuals('en_US').then(function(questions){
      expect(questions).to.be.defined;
      expect(questions[0].question).to.equal('Nombre');
    });
    httpBackend.flush();
  });

  it('should dowloand the organization\'s evaluation in english', function () {
    httpBackend.whenGET(urlResources).respond('randomstr');
    httpBackend.whenGET(urlVersion).respond('some_random_string');
    httpBackend.whenGET(urlOrganizations).respond({
      "questions": [{
        "question": "Nombre",
        "instruction": "Si quiere permanecer anónimo",
        "type": "text"
      }]
    });
    questionsService.getOrganizations('en_US').then(function(questions){
      expect(questions).to.be.defined;
      expect(questions[0].question).to.equal('Nombre');
    });
    httpBackend.flush();
  });

  it('should not download the individual\'s evaluation but retrieve it from localstorage',function(){
    httpBackend.whenGET(urlResources).respond(someRandomString);
    httpBackend.whenGET(urlVersion).respond(someRandomString);
    db.questions.version = someRandomString;
    db.questions.individuals['en_US'] = someRandomString;
    questionsService.getIndividuals('en_US').then(function(p){
      expect(p).to.be.defined;
      expect(p).to.be.equal(someRandomString);
    });
    httpBackend.flush();
  });

  it('should not download the organization\'s evaluation  but retrieve it from localstorage',function(){
    httpBackend.whenGET(urlResources).respond(someRandomString);
    httpBackend.whenGET(urlVersion).respond(someRandomString);
    db.questions.version = someRandomString;
    db.questions.organizations['en_US'] = someRandomString;
    questionsService.getOrganizations('en_US').then(function(p){
      expect(p).to.be.defined;
      expect(p).to.be.equal(someRandomString);
    });
    httpBackend.flush();
  });

});

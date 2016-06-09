'use strict';

describe('Controller: EvaluationCtrl', function () {
  var scope;
  var httpBackend;
  var EvaluationCtrl;
  var random_string = 'random_string';
  var urlResources = 'resources/locale-en_US.json';
  var urlSite = 'https://raw.githubusercontent.com/icfj-org/salama-content/gh-pages/';
  var urlVersion = urlSite + 'version.txt';
  var urlQuestions = urlSite + 'questions/en_US/individuals.json';
  var urlApi = 'http://salama-api.herokuapp.com/survey';
  var urlAdvice = urlSite + 'advices/en_US/low.md';



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

});



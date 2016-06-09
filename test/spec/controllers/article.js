'use strict';

describe('Controller: ArticleCtrl', function () {

  var scope;
  var httpBackend;
  var routeParams;
  var ArticleCtrl;
  var random_string = 'random_string';
  var urlResources = 'resources/locale-en_US.json';
  var urlSite = 'https://raw.githubusercontent.com/icfj-org/salama-content/gh-pages/';
  var urlVersion       = urlSite + 'version.txt';
  var postPath = 'random_post';
  var urlPost = urlSite + 'posts/en_US/' + postPath + '.md';


  beforeEach(module('salamaApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $routeParams) {
    scope = $rootScope.$new();
    ArticleCtrl = $controller('ArticleCtrl', {
      $scope: scope
    });
    httpBackend = $httpBackend;
    routeParams = $routeParams;
  }));

  it('should get the name of the article from the url and complete the path with the lang', function () {
    var article;
    httpBackend.whenGET(urlVersion).respond(random_string);
    httpBackend.whenGET(urlResources).respond(random_string);
    httpBackend.whenGET(urlPost).respond(random_string);
    routeParams.article = 'random_post';
    httpBackend.flush();
    article = ArticleCtrl.article;
    expect(article).to.be.equal(random_string);
  });
});

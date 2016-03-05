'use strict';

describe('Controller: ArticleCtrl', function () {

  var scope;
  var httpBackend;
  var postsService;
  var ArticleCtrl;
  var random_string = 'random_string';
  var urlResources = 'resources/locale-en_US.json';
  var urlSite = 'https://raw.githubusercontent.com/spaceship-labs/salama-content/gh-pages/';
  var urlVersion       = urlSite + 'version.txt';
  var postPath = 'en_US/random_post.md';
  var urlPost = urlSite + 'posts/' + postPath;


  beforeEach(module('salamaApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, _postsService_) {
    scope = $rootScope.$new();
    ArticleCtrl = $controller('ArticleCtrl', {
      $scope: scope
    });
    httpBackend = $httpBackend;
    postsService = _postsService_;
  }));

  it('should change the article when the service change the post selected', function () {
    var article;
    httpBackend.whenGET(urlVersion).respond(random_string);
    httpBackend.whenGET(urlResources).respond(random_string);
    httpBackend.whenGET(urlPost).respond(random_string);
    postsService.setSelected(postPath);
    postsService.getPost();
    httpBackend.flush();
    article = ArticleCtrl.article;
    expect(article).to.be.equal(random_string);
  });
});

'use strict';

describe('Service: postsService', function () {

  var urlSite          = 'https://raw.githubusercontent.com/icfj-org/salama-content/gh-pages/';
  var urlResources     = 'resources/locale-en_US.json';
  var urlVersion       = urlSite + 'version.txt';
  var pathPost         = 'en_US/test.md'
  var urlPost          = urlSite + 'posts/' + pathPost;
  var someRandomString = 'some_random_string';
  var postsService;
  var httpBackend;
  var db;

  beforeEach(module('salamaApp'));

  beforeEach(inject(function (_postsService_, $httpBackend, $localStorage) {
    postsService = _postsService_;
    httpBackend = $httpBackend;
    db = $localStorage;
  }));

  it('should set the post path selected and retrieve it', function () {
    postsService.setSelected(someRandomString);
    expect(postsService.getSelected()).to.be.equal(someRandomString);
  });

  it('should set the post path and download the post',function(){
    httpBackend.whenGET(urlResources).respond(someRandomString);
    httpBackend.whenGET(urlVersion).respond(someRandomString);
    httpBackend.whenGET(urlPost).respond('---frontMatter---' + someRandomString);
    postsService.setSelected(pathPost);
    postsService.getPost().then(function(p){
     expect(p).to.be.defined;
     expect(p).to.be.equal(someRandomString);
    });
    httpBackend.flush();
  });

  it('should set the post path and not download it because it was \'downloaded\' before and there is no changes',function(){
    httpBackend.whenGET(urlResources).respond(someRandomString);
    httpBackend.whenGET(urlVersion).respond(someRandomString);
    db.post.version = someRandomString;
    db.post.selected = someRandomString;
    db.post.post[db.selected] = someRandomString;
    postsService.getPost().then(function(p){
      expect(p).to.be.defined;
      expect(p).to.be.equal(someRandomString);
    });
    httpBackend.flush();
  });
});

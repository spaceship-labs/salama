'use strict';

describe('Service: contentService', function () {
  var contentService;
  var httpBackend;
  beforeEach(module('salamaApp'));

  beforeEach(inject(function (_contentService_,$httpBackend) {
    contentService = _contentService_;
    httpBackend = $httpBackend;
  }));

  it('should be defined', function () {
    expect(!!contentService).to.equal(true);
  });

  it('should have setted url vars',function(){
    expect(contentService.urlSite).to.not.be.empty;
    expect(contentService.urlVersion).to.not.be.empty;
    expect(contentService.urlMeta).to.not.be.empty;
    expect(contentService.urlPosts).to.not.be.empty;
    expect(contentService.urlQuestions).to.not.be.empty;
    expect(contentService.urlIndividuals).to.not.be.empty;
    expect(contentService.urlOrganizations).to.not.be.empty;
  });

  it('should have setted getters',function(){
    expect(contentService.getVersion).to.not.be.undefined;
    expect(contentService.getMeta).to.not.be.undefined;
    expect(contentService.getPost).to.not.be.undefined;
    expect(contentService.getEvalIndividuals).to.not.be.undefined;
    expect(contentService.getEvalOrganizations).to.not.be.undefined;
  });

  it('should download current version',function(){
    httpBackend.whenGET('resources/locale-en_US.json').respond('randomstr');
    httpBackend.whenGET(contentService.urlVersion).respond('some_random_string');
    contentService.getVersion().then(function(version){
      expect(version).to.not.be.empty;
    });
    httpBackend.flush();
  });



  it('should download valid metadata',function(){
    httpBackend.whenGET('resources/locale-en_US.json').respond('randomstr');
    httpBackend.whenGET(contentService.urlMeta+'locale-all.json').respond([
      {
        "language": "en_US",
        "date": "2016-02-09 09:47 -0600",
        "author": "tugorez",
        "description": "lorem ipsum",
        "published": true,
        "title": "Lorem markdown",
        "path": "en_US/2016-02-09-lorem-markdown.md"
      },
      {
        "language": "en_US",
        "date": "2016-02-11 12:29 -0600",
        "author": "Tugorez",
        "description": "Tugorez",
        "published": true,
        "title": "new post for test",
        "path": "en_US/2016-02-11-new-post-for-test.md"
      },
      {
        "language": "en_US",
        "date": "2016-02-11 12:38 -0600",
        "author": "tugorez",
        "description": "post",
        "published": true,
        "title": "This is not a regular post ",
        "path": "en_US/2016-02-11-this-is-not-a-regular-post.md"
      },
      {
        "language": "en_US",
        "date": "2016-02-03 23:21 -0600",
        "title": "English title",
        "author": "English Author",
        "description": "English Desc",
        "published": true,
        "path": "en_US/test.md"
      }
    ]);
    contentService.getMeta().then(function(metadata){
      metadata.forEach(function(item){
        expect(item.language).to.not.be.undefined;
        expect(item.date).to.not.be.undefined;
        expect(item.title).to.not.be.undefined;
        expect(item.author).to.not.be.undefined;
        expect(item.description).to.not.be.undefined;
        expect(item.published).to.be.true;
        expect(item.path).to.not.be.undefined;
      });
    });
    httpBackend.flush();
  });

  it('should download and clean a post',function(){
    httpBackend.whenGET('resources/locale-en_US.json').respond('randomstr');
    httpBackend.whenGET(contentService.urlPosts+'en_US/random.md').respond('---frontMatter---{{site.baseurl}}');
    contentService.getPost('en_US/random.md').then(function(post){
      expect(post).to.equal(contentService.urlSite);
    });
    httpBackend.flush();
  });
});

'use strict';

describe('Service: metadataService', function () {

  var urlSite      = 'https://raw.githubusercontent.com/spaceship-labs/salama-content/gh-pages/';
  var urlResources = 'resources/locale-en_US.json';
  var urlVersion   = urlSite + 'version.txt';
  var langMetadata = 'en_US';
  var urlMetadata  = urlSite + 'metadata/locale-'+langMetadata+'.json' ;
  var someRandomString = 'some_random_string';
  var metadataService;
  var httpBackend;
  var db;

  beforeEach(module('salamaApp'));

  beforeEach(inject(function (_metadataService_, $httpBackend, $localStorage) {
    metadataService = _metadataService_;
    httpBackend = $httpBackend;
    db = $localStorage;
  }));

  it('should download valid metadata', function () {

    httpBackend.whenGET(urlResources).respond('randomstr');
    httpBackend.whenGET(urlVersion).respond('some_random_string');
    httpBackend.whenGET(urlMetadata).respond([
      {
        "language": "en_US",
        "date": "2016-02-09 09:47 -0600",
        "author": "tugorez",
        "description": "lorem ipsum",
        "published": true,
        "title": "Lorem markdown",
        "path": "en_US/2016-02-09-lorem-markdown.md",
        "category":"digital"
      },
    ]);
    metadataService.getMetadata(langMetadata).then(function(metadata){
      expect(metadata).to.be.defined;
      expect(metadata).to.be.defined;
      expect(metadata[0].category).to.be.equal('digital');
    });
    httpBackend.flush();
  });

  it('should not download the metadata but retrieve it from local storage',function(){
    httpBackend.whenGET(urlResources).respond(someRandomString);
    httpBackend.whenGET(urlVersion).respond(someRandomString);
    db.metadata.version = someRandomString;
    db.metadata.metadata['en_US'] = someRandomString;
    metadataService.getMetadata('en_US').then(function(p){
      expect(p).to.be.defined;
      expect(p).to.be.equal(someRandomString);
    });
    httpBackend.flush();
  });


});

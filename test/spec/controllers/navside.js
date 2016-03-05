'use strict';

describe('Controller: NavsideCtrl', function () {

  var scope;
  var httpBackend;
  var NavsideCtrl;
  var urlResources = 'resources/locale-en_US.json';
  var urlSite = 'https://raw.githubusercontent.com/spaceship-labs/salama-content/gh-pages/';
  var urlVersion = urlSite + 'version.txt';
  var langMetadata = 'en_US';
  var urlMetadata  = urlSite + 'metadata/locale-'+langMetadata+'.json' ;
  var someRandomString = 'some_random_string';


  beforeEach(module('salamaApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    NavsideCtrl = $controller('NavsideCtrl', {
      $scope: scope
    });
    httpBackend = $httpBackend;
  }));

  it('must be hidden by default', function () {
    expect(NavsideCtrl.show).to.be.false;
  });

  it('it must show the categories obtained from metadata', function () {
    httpBackend.whenGET(urlResources).respond(someRandomString);
    httpBackend.whenGET(urlVersion).respond(someRandomString);
    httpBackend.whenGET(urlMetadata).respond([
      {
        "language": "en_US",
        "date": "2016-02-26 16:25 -0600",
        "author": "tugorez",
        "description": "This is a test",
        "category": "digital security",
        "published": true,
        "title": "Test in english - Digital Security",
        "path": "en_US/2016-02-26-test-in-english-digital-security.md"
      }
    ]);
    httpBackend.flush();
    expect(NavsideCtrl.categories).to.deep.equal(['digital security']);
  });

  it('it must show the metadata', function () {
    httpBackend.whenGET(urlResources).respond(someRandomString);
    httpBackend.whenGET(urlVersion).respond(someRandomString);
    httpBackend.whenGET(urlMetadata).respond([
      {
        "language": "en_US",
        "date": "2016-02-26 16:25 -0600",
        "author": "tugorez",
        "description": "This is a test",
        "category": "digital security",
        "published": true,
        "title": "Test in english - Digital Security",
        "path": "en_US/2016-02-26-test-in-english-digital-security.md"
      }
    ]);
    httpBackend.flush();
    expect(NavsideCtrl.metadata).to.deep.equal({
      'digital security': [
        {
          "language": "en_US",
          "date": "2016-02-26 16:25 -0600",
          "author": "tugorez",
          "description": "This is a test",
          "category": "digital security",
          "published": true,
          "title": "Test in english - Digital Security",
          "path": "en_US/2016-02-26-test-in-english-digital-security.md"
        }
      ]
    });
  });


});

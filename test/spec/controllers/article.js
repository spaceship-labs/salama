'use strict';

describe('Controller: ArticleCtrl', function () {

  // load the controller's module
  beforeEach(module('salamaApp'));

  var ArticleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleCtrl = $controller('ArticleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArticleCtrl.awesomeThings.length).toBe(3);
  });
});

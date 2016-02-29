'use strict';

describe('Controller: HomeCtrl', function () {
  beforeEach(module('salamaApp'));

  var HomeCtrl,scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });

  }));

  it('should do nothing for now', function () {
    expect(true).to.be.true;
  });
});

'use strict';

describe('Controller: HeaderCtrl', function () {
  var HeaderCtrl;
  var scope;

  beforeEach(module('salamaApp'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeaderCtrl = $controller('HeaderCtrl', {
      $scope: scope
    });

  }));

  it('"show lang options" menu must be hidden', function () {
    expect(HeaderCtrl.showLangOptions).to.be.false;
  });

  it('"show lang options" menu must be hidden after calling changeLang', function () {
    expect(HeaderCtrl.showLangOptions).to.be.false;
    HeaderCtrl.showLangOptions = true;
    HeaderCtrl.changeLang('en_US');
    expect(HeaderCtrl.showLangOptions).to.be.false;
  });

});

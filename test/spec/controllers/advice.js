'use strict';

describe('Controller: AdviceCtrl', function () {

  var AdviceCtrl;
  var scope;

  beforeEach(module('salamaApp'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdviceCtrl = $controller('AdviceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
  });
});

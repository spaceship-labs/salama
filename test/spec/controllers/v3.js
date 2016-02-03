'use strict';

describe('Controller: V3Ctrl', function () {

  // load the controller's module
  beforeEach(module('salamaApp'));

  var V3Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    V3Ctrl = $controller('V3Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(V3Ctrl.awesomeThings.length).toBe(3);
  });
});

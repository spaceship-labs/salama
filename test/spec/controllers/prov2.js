'use strict';

describe('Controller: Prov2Ctrl', function () {

  // load the controller's module
  beforeEach(module('salamaApp'));

  var Prov2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Prov2Ctrl = $controller('Prov2Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(Prov2Ctrl.awesomeThings.length).toBe(3);
  });
});

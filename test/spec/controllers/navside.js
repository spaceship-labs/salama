'use strict';

describe('Controller: NavsideCtrl', function () {

  // load the controller's module
  beforeEach(module('salamaApp'));

  var NavsideCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavsideCtrl = $controller('NavsideCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NavsideCtrl.awesomeThings.length).toBe(3);
  });
});

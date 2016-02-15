'use strict';

describe('Controller: IndividualsCtrl', function () {

  // load the controller's module
  beforeEach(module('salamaApp'));

  var IndividualsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndividualsCtrl = $controller('IndividualsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
   // expect(IndividualsCtrl.awesomeThings.length).toBe(3);
  });
});

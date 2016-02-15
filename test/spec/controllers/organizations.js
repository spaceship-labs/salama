'use strict';

describe('Controller: OrganizationsCtrl', function () {

  // load the controller's module
  beforeEach(module('salamaApp'));

  var OrganizationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrganizationsCtrl = $controller('OrganizationsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
 //   expect(OrganizationsCtrl.awesomeThings.length).toBe(3);
  });
});

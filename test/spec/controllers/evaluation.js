'use strict';

describe('Controller: EvaluationCtrl', function () {

  // load the controller's module
  beforeEach(module('salamaApp'));

  var EvaluationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EvaluationCtrl = $controller('EvaluationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(EvaluationCtrl.awesomeThings.length).toBe(3);
  });
});

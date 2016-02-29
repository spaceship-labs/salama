'use strict';

describe('Directive: formQuestion', function () {

  // load the directive's module
  beforeEach(module('salamaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    //element = angular.element('<form-question></form-question>');
    //element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the formQuestion directive');
  }));
});

'use strict';

describe('Directive: pageQuestions', function () {

  // load the directive's module
  beforeEach(module('salamaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
   // element = angular.element('<page-questions></page-questions>');
   // element = $compile(element)(scope);
   // expect(element.text()).toBe('this is the pageQuestions directive');
  }));
});

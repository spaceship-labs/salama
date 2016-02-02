'use strict';

describe('Service: questionsService', function () {

  // load the service's module
  beforeEach(module('salamaApp'));

  // instantiate service
  var questionsService;
  beforeEach(inject(function (_questionsService_) {
    questionsService = _questionsService_;
  }));

  it('should do something', function () {
    expect(!!questionsService).toBe(true);
  });

});

'use strict';

describe('Service: contentService', function () {

  // load the service's module
  beforeEach(module('salamaApp'));

  // instantiate service
  var contentService;
  beforeEach(inject(function (_contentService_) {
    contentService = _contentService_;
  }));

  it('should do something', function () {
    //expect(!!contentService).toBe(true);
  });

});

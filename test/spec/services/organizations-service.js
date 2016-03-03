'use strict';

describe('Service: organizationsService', function () {

  // load the service's module
  beforeEach(module('salamaApp'));

  // instantiate service
  var organizationsService;
  beforeEach(inject(function (_organizationsService_) {
    organizationsService = _organizationsService_;
  }));

  it('should do something', function () {
    expect(!!organizationsService).toBe(true);
  });

});

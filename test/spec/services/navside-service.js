'use strict';

describe('Service: navsideService', function () {

  // load the service's module
  beforeEach(module('salamaApp'));

  // instantiate service
  var navsideService;
  beforeEach(inject(function (_navsideService_) {
    navsideService = _navsideService_;
  }));

  it('should do something', function () {
    expect(!!navsideService).toBe(true);
  });

});

'use strict';

describe('Service: adviceProService', function () {

  // load the service's module
  beforeEach(module('salamaApp'));

  // instantiate service
  var adviceProService;
  beforeEach(inject(function (_adviceProService_) {
    adviceProService = _adviceProService_;
  }));

  it('should do something', function () {
    expect(!!adviceProService).toBe(true);
  });

});

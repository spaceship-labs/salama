'use strict';

describe('Service: individualsService', function () {

  // load the service's module
  beforeEach(module('salamaApp'));

  // instantiate service
  var individualsService;
  beforeEach(inject(function (_individualsService_) {
    individualsService = _individualsService_;
  }));

  it('should do something', function () {
    expect(!!individualsService).toBe(true);
  });

});

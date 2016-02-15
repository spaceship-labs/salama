'use strict';

describe('Service: metaService', function () {

  // load the service's module
  beforeEach(module('salamaApp'));

  // instantiate service
  var metaService;
  beforeEach(inject(function (_metaService_) {
    metaService = _metaService_;
  }));

  it('should do something', function () {
    //expect(!!metaService).to.equal(true);
  });

});

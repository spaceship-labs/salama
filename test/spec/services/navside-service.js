'use strict';

describe('Service: navsideService', function () {
  beforeEach(module('salamaApp'));

  var navsideService;

  beforeEach(inject(function (_navsideService_) {
    navsideService = _navsideService_;
  }));

  it('should be initially setted to false', function () {
    expect(navsideService.getState()).to.be.false;
  });

  it('should be true after calling changeState', function () {
    navsideService.changeState();
    expect(navsideService.getState()).to.be.true;
  });
  it('should be false after calling twice changeState', function () {
    navsideService.changeState();
    expect(navsideService.getState()).to.be.true;
    navsideService.changeState();
    expect(navsideService.getState()).to.be.false;
  });

});

'use strict';

describe('Service: scoreService', function () {
  var scoreService;

  beforeEach(module('salamaApp'));

  beforeEach(inject(function (_scoreService_) {
    scoreService = _scoreService_;
  }));

  it('should do something', function () {
    expect(scoreService.getRiskLevel(10)).to.equal('low');
    expect(scoreService.getRiskLevel(41)).to.equal('mid');
    expect(scoreService.getRiskLevel(60)).to.equal('high');
    expect(scoreService.getRiskLevel(99)).to.equal('extreme');
  });

});

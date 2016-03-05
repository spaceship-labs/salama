'use strict';

describe('Controller: HomeCtrl', function () {
  var HomeCtrl
  var scope;
  var navsideService;

  beforeEach(module('salamaApp'));

  beforeEach(inject(function ($controller, $rootScope,_navsideService_) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
    navsideService = _navsideService_;
  }));

  it('change the navside state', function () {
    var state;
    var newState;
    state = navsideService.getState();
    HomeCtrl.changeStateSide();
    newState =  navsideService.getState();
    expect(state).to.be.equal(!newState);
  });

});

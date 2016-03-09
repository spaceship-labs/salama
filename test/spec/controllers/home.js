'use strict';

describe('Controller: HomeCtrl', function () {

  var HomeCtrl
  var scope;
  var mdSidenav;

  beforeEach(module('salamaApp'));

  beforeEach(inject(function ($controller, $rootScope, $mdSidenav) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
    mdSidenav = $mdSidenav;
  }));

  it('change the navside state', function () {
    var state;
    var newState;
    state = mdSidenav('left').isOpen();
    HomeCtrl.changeStateSide();
    newState = mdSidenav('left').isOpen();
    expect(!!state).to.not.be.equal(newState);
  });

});

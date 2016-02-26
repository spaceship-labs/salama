'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the salamaApp
 */
(function(){
  angular.module('salamaApp')
  .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject=['navsideService'];

  function HomeCtrl(navsideService){

    var ctrl = this;

    ctrl.changeStateSide = changeStateSide;

    function changeStateSide(){
      navsideService.changeState();
    }

  }
})();

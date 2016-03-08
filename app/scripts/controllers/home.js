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

  HomeCtrl.$inject=['$window','$mdSidenav'];

  function HomeCtrl($window,$mdSidenav){

    var ctrl = this;
    setFixedMenu();

    ctrl.changeStateSide = changeStateSide;

    function changeStateSide(){
      $mdSidenav('left').toggle();
    }

    function setFixedMenu(){
      var w = angular.element($window);
      w.bind('load resize',function (){
        var h = w.height() - 120;
        $('.content-home').css('min-height',h+'px');
      });
    }

  }
})();

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
    var w = angular.element($window);
    setFixedMenu();

    ctrl.changeStateSide = changeStateSide;

    function changeStateSide(){
      $mdSidenav('left').toggle();
    }

    function fixedMenu(){
      var h = w.height() - 120;
      $('.content-home').css('min-height',h+'px');
    }

    function setFixedMenu(){
      fixedMenu();
      w.bind('load resize',function (){
        var h = w.height() - 120;
        fixedMenu();
      });
    }

  }
})();

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

  HomeCtrl.$inject=['$window','$mdSidenav','$mdDialog'];

  function HomeCtrl($window,$mdSidenav,$mdDialog){

    var ctrl = this;
    var w = angular.element($window);

    ctrl.showVideo = showVideo;
    ctrl.changeStateSide = changeStateSide;
    setFixedMenu();

    function fixedMenu(){
      var h = w.height() - 120;
      $('.content-home').css('min-height',h+'px');
    }

    function changeStateSide(){
      $mdSidenav('left').toggle();
    }

    function setFixedMenu(){
      fixedMenu();
      w.bind('load resize',function (){
        var h = w.height() - 120;
        fixedMenu();
      });
    }

    function showVideo(){
      $mdDialog.show({
        template : '<iframe width="560" height="315" src="https://www.youtube.com/embed/-zsO2rUM0oU" frameborder="0" allowfullscreen></iframe>',
        clickOutsideToClose : true
      });
    }

  }
})();

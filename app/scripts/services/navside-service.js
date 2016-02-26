'use strict';

/**
 * @ngdoc service
 * @name salamaApp.navsideService
 * @description
 * # navsideService
 * Service in the salamaApp.
 */

(function(){
  angular.module('salamaApp')
    .factory('navsideService',navsideService);

  navsideService.$inject = [];

  function navsideService(){

    var show = false;

    return {
      changeState: changeState,
      getState: getState
    };

    function changeState(){
      show = !show;
    }

    function getState(){
      return show;
    }

  }
})();


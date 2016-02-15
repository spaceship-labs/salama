'use strict';

/**
 * @ngdoc service
 * @name salamaApp.postsService
 * @description
 * # postsService
 * Service in the salamaApp.
 */
(function(){
  angular
    .module('salamaApp')
    .factory('postsService',postsService);

  postsService.$inject = [];

  function postsService(){
    return {};
  }
})();

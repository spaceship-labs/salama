'use strict';

/**
 * @ngdoc service
 * @name salamaApp.metaService
 * @description
 * # metaService
 * Service in the salamaApp.
 */
(function(){
  angular
    .module('salamaApp')
    .factory('metaService',metaService);

  metaService.$inject = ['$q','$localStorage','githubService'];

  function metaService($q,$localStorage,githubService){
    $localStorage.metaService = $localStorage.metaService || {};
    var db = $localStorage.metaService;
    var github = githubService;
    return { getMetadata: getMetadata };

    function getMetadata(lang){
      return github.getLatestVersion().then(validateVersion);
    }

    function validateVersion(version){
      if( !db.version || db.version!==version || !db.metadata ){
          db.version = version;
          return setMetadata();
      }
      return db.metadata;
    }

    function setMetadata(){
      return github.getMetadata().then(function(metadata){
        db.metadata=metadata;
        return metadata;
      });
    }
  }
})();

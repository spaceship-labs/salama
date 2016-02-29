'use strict';

/**
 * @ngdoc service
 * @name salamaApp.metadataService
 * @description
 * # metadataService
 * Service in the salamaApp.
 */
(function(){
  angular.module('salamaApp')
    .service('metadataService', metadataService);

  metadataService.$inject = ['$localStorage', 'contentService'];

  function metadataService($localStorage, contentService){

    var db      = $localStorage.metadata = $localStorage.metadata || {};
    db.metadata = db.metadata || {};
    db.version  = db.version || '';
    db.lang     = db.lang || 'en_US';

    return {
      getMetadata: getMetadata
    };

    function getMetadata(lang){
      setLang(lang);
      return contentService.getVersion()
        .then(resolveVersion)
        .then(resolveMetadata);
    }

    function resolveVersion(newversion){
      if (db.version != newversion) {
        db.version = newversion;
        return true;
      }
      return false;
    }

    function resolveMetadata(newversion){
      if (!db.metadata[db.lang] || newversion) {
        return contentService.getMetadata(db.lang).then(setMetadata);
      }
      return db.metadata[db.lang];
    }

    function setMetadata(newmetadata){
      db.metadata = newmetadata;
      return newmetadata;
    }

    function setLang(newlang){
      db.lang = newlang;
    }
  }
})();

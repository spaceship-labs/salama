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

  metaService.$inject = ['$q','$localStorage'];

  function metaService($q,$localStorage){
    $localStorage.metaService = $localStorage.metaService || {};
    var db = $localStorage.metaService;
    var creden = { username:null, password:null, auth:'basic'};
    var config = { owner: 'spaceship-labs', repo: 'salama-content' };
    var repo = new Github( creden ).getRepo( config.owner, config.repo );
    return { getMeta: getMeta };

    function getMeta(lang){
      return getRepoVersion().then(validateVersion);
    }

    function getRepoVersion(){
      var deferred = $q.defer();
      repo.show(function(err,data){
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(data.updated_at);
          }
      });
      return deferred.promise;
    }

    function validateVersion(version){
      if( !db.version || db.version!==version || !db.metadata ){
        db.version=version;
        return downloadMeta();
      }
      return db.metadata;
    }

    function downloadMeta(){
      var deferred = $q.defer();
      var config={ branch:'master', path:'metadata/locale-all.json' };
      repo.read(config.branch,config.path,function(err,metadata){
        if(err){
          deferred.reject(err);
        }else{
          db.metadata = JSON.parse(metadata);
          deferred.resolve(db.metadata);
        }
      });
      return deferred.promise;
    }
  }
})();

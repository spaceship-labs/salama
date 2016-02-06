'use strict';

/**
 * @ngdoc service
 * @name salamaApp.githubService
 * @description
 * # githubService
 * Service in the salamaApp.
 */

(function(){
  angular.module('salamaApp')
    .factory('githubService',githubService);

  githubService.$inject = ['$q'];

  function githubService($q){
    var creden = { username:null, password:null, auth:'basic'};
    var config = { owner: 'spaceship-labs', repo: 'salama-content' };
    var repo = new Github(creden).getRepo(config.owner, config.repo);
    return {
      getLatestVersion:getLatestVersion,
      getMetadata: getMetadata,
      getContent: getContent
    }

    function getLatestVersion(){
      var deferred = $q.defer();
      repo.show(function(err,data){
        if(err){
          deferred.reject(err);
        }else{
          deferred.resolve(data.updated_at);
        }
      });
      return deferred.promise;
    }

    function getMetadata(){
      return getFile('master','metadata/locale-all.json')
        .then(function(metadata){ return JSON.parse(metadata);});
    }

    function getContent(path){
      return getFile('master',path);
    }

    function getFile(branch,path){
      var deferred = $q.defer();
      repo.read(branch,path,function(err,file){
        if(err){
          deferred.reject(err);
        }else{
          deferred.resolve(file);
        }
      });
      return deferred.promise;
    }

  }
})();

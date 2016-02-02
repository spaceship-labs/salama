'use strict';

/**
 * @ngdoc service
 * @name salamaApp.metaService
 * @description
 * # metaService
 * Service in the salamaApp.
 */
angular
  .module('salamaApp')
  .factory('metaService',metaService);

metaService.$inject = ['$q'];

function metaService($q){
  var repo=connect();
  var service={
      getMeta:getMeta
  };
  return service;


  function connect(){
    //we are just reading content so
    //we dont need to set real credentials
    var ghCreden={
      username:null,
      password:null,
      auth:'basic'
    };
    var repoOwner='spaceship-labs';
    var repoName='salama-content';
    return new Github(ghCreden).getRepo(repoOwner,repoName);
  }

  function getMeta(){
    var deferred=$q.defer();
    var repoBranch='master';
    var repoMetaPath='metadata';
    repo.contents( repoBranch, repoMetaPath, function(err,content){
        if(err){
          deferred.reject(err);
        }else{
          deferred.resolve(content);
        }
    });
    return deferred.promise;
  }

  function getLatestCommit(){
  }

}

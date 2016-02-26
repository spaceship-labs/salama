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

  postsService.$inject = ['$localStorage','contentService'];

  function postsService($localStorage, contentService){

    var db;

    $localStorage.postService = $localStorage.postService || {};
    db = $localStorage.postService;
    db.metadata = db.metadata || {};
    db.post = db.post || {};

    return {
      getSelected: getSelected,
      getMeta: getMeta,
      getPost: getPost,
      setPost: setPost,
      setLang: setLang
    };

    function getSelected(){
      return db.selected;
    }

    function getMeta(){
      return existsNewVersion().then(resolveMeta);
    }

    function getPost(){
      return existsNewVersion().then(resolvePost);
    }

    function setPost(path){
      db.selected = path;
    }

    function setLang(lang){
      db.lang = lang;
    }

    function existsNewVersion(){
      return contentService.getVersion()
        .then(validateNewVersion);
    }

    function validateNewVersion(version){
      if (!db.version || db.version != version){
        db.version = version;
        return true;
      }
      return false;
    }

    function resolveMeta(mustDownload){
      if (!db.metadata[db.lang] || mustDownload){
        return contentService.getMeta(db.lang).then(function(metadata){
          db.metadata = metadata;
          return metadata;
        });
      }
      return db.metadata;
    }

    function resolvePost(mustDownload){
      if (!db.post[db.selected] || mustDownload){
        return contentService.getPost(db.selected).then(function(post){
          db.post[db.selected] = post;
          return post;
        });
      }
      return db.post[db.selected];
    }
  }
})();

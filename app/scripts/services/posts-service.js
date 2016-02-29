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
    var db     = $localStorage.post = $localStorage.post || {};
    db.post    = db.post || {} ;
    db.version = db.version || '';

    return {
      getSelected: getSelected,
      setSelected: setSelected,
      getPost: getPost
    };

    function getSelected(){
      return db.path;
    }

    function setSelected(newpath){
      db.path = newpath;
    }

    function getPost(){
      return contentService.getVersion()
        .then(resolveVersion)
        .then(resolvePost);
    }

    function resolveVersion(newversion){
      if (db.version != newversion) {
        db.version = newversion;
        return true;
      }
      return false;
    }

    function resolvePost(newversion){
      if (!db.post[db.path] || newversion) {
        return contentService.getPost(db.path).then(setPost);
      }
      return db.post[db.path];
    }

    function setPost(newpost){
      db.post[db.path] = newpost;
      return newpost;
    }

  }
})();

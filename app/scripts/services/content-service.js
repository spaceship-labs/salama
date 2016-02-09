'use strict';

/**
 * @ngdoc service
 * @name salamaApp.contentService
 * @description
 * # contentService
 * Service in the salamaApp.
 */
(function(){
  angular
    .module('salamaApp')
    .factory('contentService', contentService);

  contentService.$inject = ['$q','$localStorage','githubService'];

  function contentService($q,$localStorage,githubService) {
    $localStorage.contentService = $localStorage.contentService || {};
    var db = $localStorage.contentService;
    var github = githubService;
    return {
      setArticleSelected: setArticleSelected,
      getArticle: getArticle
    };

    function setArticleSelected(path){
      db.selected=path;
    }

    function getArticle(){
      if( !db.articles || !db.articles[db.selected] ){
        return setArticle();
      }
      return $q.resolve(db.articles[db.selected]);
    }

    function setArticle(){
      db.articles = db.articles || {};
      return github.getContent(db.selected).then(function(content){
        //removing frontmatter
        content = content.replace(/^---(.|\s)*?---/,'');
        //replacing site.baseurl
        content = content.replace(/{{site.baseurl}}/,'https://raw.githubusercontent.com/spaceship-labs/salama-content/master/');
        db.articles[db.selected] = content;
        return db.articles[db.selected];
      });
    }
  }
})();

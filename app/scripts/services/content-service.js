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

  contentService.$inject = ['$q', '$http'];

  function contentService($q, $http){

    var urlSite = 'https://raw.githubusercontent.com/spaceship-labs/salama-content/gh-pages/';
    var urlVersion = urlSite + 'version.txt';
    var urlMeta = urlSite + 'metadata/';
    var urlPosts = urlSite + 'posts/';
    var urlQuestions = urlSite + 'questions/';
    var urlIndividuals = urlQuestions + 'individuals/';
    var urlOrganizations = urlQuestions + 'organizations/';

    return {
      urlSite: urlSite,
      urlVersion: urlVersion,
      urlMeta: urlMeta,
      urlPosts: urlPosts,
      urlQuestions: urlQuestions,
      urlIndividuals: urlIndividuals,
      urlOrganizations: urlOrganizations,
      getVersion: getVersion,
      getMeta: getMeta,
      getPost: getPost,
      getEvalIndividuals: getEvalIndividuals,
      getEvalOrganizations: getEvalOrganizations
    };

    function getMeta(lang){
      lang = lang || 'all';
      var url = urlMeta + 'locale-' + lang + '.json';
      return downloadFile(url);

    }

    function getPost(path){
      var url = urlPosts+path;
      return downloadFile(url).then(function(post){
        //removing frontmatter
        post = post.replace(/^---(.|\s)*?---/,'');
        post = post.replace(/{{site.baseurl}}/,urlSite)
        return post;
      });
    }

    function getEvalIndividuals(lang){
      var url = urlIndividuals + 'locale-' + lang + '.json' ;
      return downloadFile(url);
    }

    function getEvalOrganizations(lang){
      var url = urlOrganizations + 'locale-' + lang + '.json' ;
      return downloadFile(url);
    }

    function getVersion(){
      return downloadFile(urlVersion);
    }

    function downloadFile(url){
      var deferred = $q.defer();
      $http.get(url).then(
        function(res){
          deferred.resolve(res.data);
        },
        function(err){
          deferred.reject(err);
        }
      );
      return deferred.promise;
    }
  }
})();

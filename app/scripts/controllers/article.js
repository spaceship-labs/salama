'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the salamaApp
 */
(function(){
  angular.module('salamaApp')
    .controller('ArticleCtrl', ArticleCtrl);

  ArticleCtrl.$inject=['$scope', '$routeParams', 'postsService'];

  function ArticleCtrl($scope, $routeParams, postsService){

    var ctrl = this;

    ctrl.article = '';

    activate();

    function activate(){
      var selected = $routeParams.lang + '/' +$routeParams.article;
      postsService.setSelected(selected);
      getPost();
    }

    function getSelected(){
      return postsService.getSelected();
    }

    function getPost(){
      postsService.getPost()
        .then(setPost)
        .catch(logError);
    }

    function setPost(post){
      ctrl.article = post;
    }

    function logError(err){
      console.error(err);
    }

  }
})();


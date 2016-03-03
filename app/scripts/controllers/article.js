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

  ArticleCtrl.$inject=['$scope', 'postsService'];

  function ArticleCtrl($scope, postsService){

    var ctrl=this;

    ctrl.article = null;

    activate();

    function activate(){
      $scope.$watch(getSelected, getPost);
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


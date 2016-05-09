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

  ArticleCtrl.$inject=[
    '$scope',
    '$translate',
    '$routeParams',
    'postsService'
  ];

  function ArticleCtrl($scope, $translate, $routeParams, postsService){

    var ctrl = this;

    ctrl.article = '';

    activate();

    function activate(){
      $scope.$watch(getLang, setLang);
      $scope.$watch(getLang, getPost);
    }

    function getLang(){
      return $translate.use();
    }

    function getSelected(){
      return postsService.getSelected();
    }

    function getPost(lang){
      var selected = lang + '/' +$routeParams.article + '.md';
      postsService.setSelected(selected);
      postsService.getPost()
        .then(setPost)
        .catch(logError);
    }

    function setPost(post){
      ctrl.article = post;
    }

    function setLang(lang){
      ctrl.lang = lang;
    }

    function logError(err){
      console.error(err);
    }

  }
})();


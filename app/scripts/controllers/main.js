'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratoCtrl
 * @description
 * # ContratoCtrl
 * Controller of the ctbookApp
 */
(function(){
  angular
    .module('salamaApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject=['$scope', '$route', '$translate', 'postsService'];
  function MainCtrl($scope, $route, $translate, postsService){
    var ctrl = this;
    ctrl.meta= [];
    ctrl.changeLang = changeLang;
    ctrl.setPost = setPost;

    activate();

    function changeLang(lang){
      $translate.use(lang);
    }



    function activate(){
      $scope.$watch(getLang,getMeta);
    }

    function getMeta(lang){
      postsService.setLang(lang);
      postsService.getMeta().then(setMeta).catch(logError);
    }

    function setMeta(metadata){
      ctrl.metadata = metadata;
    }

    function setPost(path){
      postsService.setPost(path);
      $route.reload();
    }

    function getLang(){
      return $translate.use();
    }

    function logError(err){
      console.log("***Notify the IT department about this error");
      console.log(err);
    }

  }
})();


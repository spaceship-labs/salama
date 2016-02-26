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
    ctrl.metadata = {};
    ctrl.categories = [];
    ctrl.changeLang = changeLang;
    ctrl.setPost = setPost;
    ctrl.showOptions = false;
    ctrl.showSide = false;

    activate();

    function changeLang(lang){
      ctrl.showOptions = false;
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
      ctrl.metadata = {};
      ctrl.categories = [];
      metadata.forEach(function(m){
        var tags = m.tags || ['others'];
        tags.forEach(function(t){
          ctrl.metadata[t] = ctrl.metadata[t] || [];
          ctrl.metadata[t].push(m) ;
          if(ctrl.categories.indexOf(t)==-1){
            ctrl.categories.push(t);
          }
        });
      });
    }

    function setPost(path){
      postsService.setPost(path);
      $route.reload();
      ctrl.showSide = false;
    }

    function getLang(){
      return $translate.use();
    }

    function logError(err){
      console.error(err);
    }

  }
})();


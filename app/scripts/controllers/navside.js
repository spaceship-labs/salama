'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:NavsideCtrl
 * @description
 * # NavsideCtrl
 * Controller of the salamaApp
 */

(function(){
  angular.module('salamaApp')
    .controller('NavsideCtrl',NavsideCtrl);

  NavsideCtrl.$inject = ['$scope', '$translate', 'navsideService', 'postsService'];

  function NavsideCtrl($scope, $translate, navsideService, postsService){

    var ctrl = this;

    ctrl.show = false;
    ctrl.categories = [];
    ctrl.metadata = {};
    ctrl.changeStateSide = changeStateSide;
    ctrl.setPost = setPost;

    activate();

    function activate(){
      $scope.$watch(getLang, getMeta);
      $scope.$watch(getState, setState);
    }

    function getState(){
      return navsideService.getState();
    }

    function getLang(){
      return $translate.use();
    }

    function getMeta(lang){
      postsService.setLang(lang);
      postsService.getMeta()
        .then(setCategories)
        .then(setMeta)
        .catch(logError);
    }

    function setState(show){
      ctrl.show = show;
    }

    function setCategories(meta){
      var categories = [];
      meta.forEach(function(m){
        if (categories.indexOf(m)==-1) {
          categories.push(m.category);
        }
      });
      ctrl.categories = categories;
      return meta;
    }

    function setMeta(meta){
      var metadata = {};
      meta.forEach(function(m){
        metadata[m.category] = metadata[m.category] || [];
        metadata[m.category].push(m);
      });
      ctrl.metadata = metadata;
    }

    function setPost(path){
      postsService.setPost(path);
      changeStateSide();
    }

    function changeStateSide(){
      navsideService.changeState();
    }

    function logError(err){
      console.error(err);
    }
  }
})();

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

  NavsideCtrl.$inject = ['$scope', '$translate', 'navsideService', 'metadataService', 'postsService'];

  function NavsideCtrl($scope, $translate, navsideService, metadataService, postsService){

    var ctrl = this;
    ctrl.show = false;
    ctrl.categories = [];
    ctrl.metadata = {};
    ctrl.changeStateSide = changeStateSide;
    ctrl.setPost = setPost;

    activate();

    function activate(){
      $scope.$watch(getState, setState);
      $scope.$watch(getLang, getMetadata);
    }

    function changeStateSide(){
      navsideService.changeState();
    }

    function getState(){
      return navsideService.getState();
    }

    function setState(show){
      ctrl.show = show;
    }

    function getLang(){
      return $translate.use();
    }

    function getMetadata(lang){
      return metadataService.getMetadata(lang)
      .then(setCategories)
      .then(setMetadata);
    }

    function setCategories(metadata){
      var categories = [];
      metadata.forEach(function(m){
        var category = m.category;
        categories.indexOf(category) != -1 || categories.push(category);
      });
      ctrl.categories = categories;
      return metadata;
    }

    function setMetadata(repoMetadata){
      var metadata = {};
      repoMetadata.forEach(function(m){
        var category = m.category;
        metadata[category] = metadata[category] || [];
        metadata[category].push(m);
      });
      ctrl.metadata = metadata;
      return repoMetadata;
    }

    function setPost(path){
      changeStateSide();
      postsService.setSelected(path);
    }

    function logError(err){
      console.error(err);
    }
  }
})();

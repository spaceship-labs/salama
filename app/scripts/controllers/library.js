'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:LibraryCtrl
 * @description
 * # LibraryCtrl
 * Controller of the salamaApp
 */
angular.module('salamaApp')
  .controller('LibraryCtrl',LibraryCtrl);

LibraryCtrl.$inject=['$scope', '$translate', 'postsService'];

function LibraryCtrl($scope, $translate, postsService){

  var ctrl = this;
  ctrl.meta= [];
  ctrl.setPost = setPost;

  activate();

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
  }

  function getLang(){
    return $translate.use();
  }

  function logError(err){
    console.log("***Notify the IT department about this error");
    console.log(err);
  }

}

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

LibraryCtrl.$inject=[];

function LibraryCtrl(){
  var ctrl = this;
  ctrl.metadata = [];
  ctrl.setArticleSelected = setArticleSelected;

  activate();

  function activate(){

  }

  function setMetadata(metadata){

  }

  function setArticleSelected(path){

  }

  function logError(err){

  }

}

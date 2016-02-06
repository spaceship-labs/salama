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

LibraryCtrl.$inject=['metaService','contentService'];

function LibraryCtrl(metaService,contentService) {
  var ctrl = this;
  ctrl.metadata = [];
  ctrl.setArticleSelected = setArticleSelected;

  activate();

  function activate(){
    metaService.getMetadata()
      .then(setMetadata)
      .catch(logError);
  }

  function setMetadata(metadata){
    ctrl.metadata=metadata;
  }

  function setArticleSelected(path){
    contentService.setArticleSelected(path);
  }

  function logError(err){
    console.log(err);
  }

}

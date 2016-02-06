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

LibraryCtrl.$inject=['metaService'];

function LibraryCtrl(metaService) {
  var ctrl=this;
  ctrl.metadata=[];
  activate();

  function activate(){
    metaService.getMeta()
      .then(saveMeta)
      .catch(logError);
  }

  function saveMeta(metadata){
    ctrl.metadata=metadata;
    console.log(metadata);
  }

  function logError(err){
    console.log(err);
  }
}

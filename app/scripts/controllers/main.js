'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratoCtrl
 * @description
 * # ContratoCtrl
 * Controller of the ctbookApp
 */
angular.module('salamaApp')
  .controller('MainCtrl', mainCtrl);

function mainCtrl(contentService) {
  /* jshint validthis: true */
  var vm = this;

  vm.load = load;

  vm.load();

  function load(){
    contentService.connect();
  }

}

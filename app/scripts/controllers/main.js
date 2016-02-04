'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratoCtrl
 * @description
 * # ContratoCtrl
 * Controller of the ctbookApp
 */
angular
  .module('salamaApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject=['$translate','metaService'];
function MainCtrl($translate,metaService) {
  var ctrl=this;
  this.changeLang=changeLang;

  /////
  function changeLang(lang){
    $translate.use(lang);
  }
}

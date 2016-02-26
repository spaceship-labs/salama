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
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject=['$translate', 'navsideService'];

  function HeaderCtrl($translate, navsideService){

    var ctrl = this;

    ctrl.showLangOptions = false;
    ctrl.changeLang = changeLang;
    ctrl.changeStateSide = changeStateSide;

    function changeLang(lang){
      $translate.use(lang);
    }

    function changeStateSide(){
      navsideService.changeState();
    }

    function logError(err){
      console.error(err);
    }

  }
})();


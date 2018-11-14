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

  HeaderCtrl.$inject=[
    '$scope',
    '$translate',
    '$mdSidenav',
    '$window',
    '$timeout',
    'metadataService',
    'adviceService'
  ];

  function HeaderCtrl(
    $scope,
    $translate,
    $mdSidenav,
    $window,
    $timeout,
    metadataService,
    adviceService
  ){

    var ctrl = this;
    // headerStuff
    ctrl.showLangOptions = false;
    ctrl.changeLang = changeLang;

    // navsideStuff
    ctrl.changeStateSide = changeStateSide;
    ctrl.categories = [];
    ctrl.metadata = {};
    ctrl.setPost = setPost;
    ctrl.headerFixed = false;
    ctrl.sidenavSelect = sidenavSelect;

    activate();

    var sidenavItems = angular.element('.sidenav-item .sd-item');
    sidenavItems.hover(sidenavSelect, sidenavSelect);

    var selectClass = 'sidenav-selected';
    var activeClass = 'sidenav-active';
    function sidenavSelect($event){
      console.log('run!');
      var ls = angular.element('.sidenav-item');
      var ele = angular.element($event.target).parent().parent();
      var active;
      if (ele.hasClass(activeClass)) {
        ele.removeClass(activeClass);
      } else {
        ele.addClass(activeClass);
        active = true;
      }
      ls.each(function(i, ele) {
        var e = angular.element(ele);
        if (e.hasClass(activeClass)) {
          e.removeClass(selectClass);
        } else {
          e.addClass(selectClass);
        }
      });
      if (!active) {
        ls.removeClass(selectClass);
      }
    }


    // newFoo
    function changeStateSide(){
      $mdSidenav('left').toggle();
    }

    function setFixedMenu(){
      angular.element($window).bind('scroll',function (){
        if($window.pageYOffset > 60){
          $timeout(function (){
            ctrl.headerFixed = true;
          });
        }else{
          $timeout(function (){
            ctrl.headerFixed = false;
          });
        }
      });
    }

    // headerFoo
    function changeLang(lang){
      ctrl.showLangOptions = !ctrl.showLangOptions;
      $translate.use(lang);
    }

    // navsideFoo

    function activate(){
      $scope.$watch(getLang, setLang);
      $scope.$watch(getLang, getMetadata);
      $scope.$watch(
        function(){
          return adviceService.getResultsIndividuals().completed;
        },
        function(completed){
          if (completed === true){
            ctrl.individuals = '#/advice';
          }else{
            ctrl.individuals = '#/evaluation/individual';
          }
        }
      );
      setFixedMenu();
    }


    function getLang(){
      return $translate.use();
    }

    function setLang(lang){
      ctrl.lang = lang;
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
    }

    function logError(err){
      console.error(err);
    }

  }
})();


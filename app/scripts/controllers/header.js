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

    activate();

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
      $scope.$watch(getLang, getMetadata);
      $scope.$watch(
        function(){
          return adviceService.getResults().completed;
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


'use strict';

/**
 * @ngdoc service
 * @name salamaApp.adviceProService
 * @description
 * # adviceProService
 * Service in the salamaApp.
 */
(function(){
  angular.module('salamaApp')
    .service('adviceProService', adviceProService);

  adviceProService.$inject = [];
  function adviceProService(){
    var riskMatrix = [
      ['adequately, adequately', 'potentially_over', 'potentially_over', 'potentially_over'],
      ['potentially_poorly', 'adequately', 'potentially_over', 'potentially_over', 'potentially_over'],
      ['potentially_poorly', 'adequately', 'potentially_over', 'potentially_over', 'potentially_over'],
      ['poorly', 'potentially_poorly', 'adequately', 'potentially_over', 'potentially_over'],
      ['poorly', 'potentially_poorly', 'adequately', 'adequately', 'potentially_over'],
      ['poorly', 'poorly', 'potentially_poorly', 'adequately', 'potentially_over'],
      ['poorly', 'poorly', 'potentially_poorly', 'adequately', 'adequately'],
      ['poorly', 'poorly', 'poorly', 'potentially_poorly', 'adequately'],
      ['poorly', 'poorly', 'poorly', 'potentially_poorly', 'adequately']
    ];
    return {

    };
  }
})();

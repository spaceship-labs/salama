'use strict';

/**
 * @ngdoc directive
 * @name salamaApp.directive:formQuestion
 * @description
 * # formQuestion
 */
(function(){
  angular.module('salamaApp')
    .directive('formQuestion',formQuestion);

  function formQuestion(){
    var template = '<ng-include src="\'views/questions/\'+question.type+\'.html\'"></ng-include>';
    return {
      template: template,
    };
  }
})();


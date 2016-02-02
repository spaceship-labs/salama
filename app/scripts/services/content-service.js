'use strict';

angular
  .module('salamaApp')
  .service('contentService', contentService);

function contentService($q) {
  var service=this;
  service.connect = connect;
  service.getHash=getHash;
  service.repo=null;

  service.connect();

  ////////////////

  function connect($q) {
    var github = new Github({
      username: 'tugorez',
      password: 'juanjo271193',
      auth: 'basic',
    });
    service.repo=github.getRepo(
      'spaceship-labs',
      'salama-content'
    );
  }

  function getHash(){
    $q(function(a,b){

    });
  }
}

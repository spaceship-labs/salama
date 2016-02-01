'use strict';

angular
  .module('salamaApp')
  .service('contentService', Service);

//Service.$inject = ['dependencies'];

/* @ngInject */
function Service() {
  this.connect = connect;

  ////////////////

  function connect() {
    var github = new Github({
      username: 'el-sonny',
      password: '---------',
      auth: 'basic',
    });

    var repo = github.getRepo('spaceship-labs', 'salama-content');

    repo.show(function(err,repo){
      console.log(err);
      console.log(repo);
    });
  }
}

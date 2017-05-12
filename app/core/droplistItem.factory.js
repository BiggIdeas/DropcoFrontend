(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('droplistItemFactory', droplistItemFactory);

  droplistItemFactory.$inject = ['$http', 'apiUrl'];

  /* @ngInject */
  function droplistItemFactory($http, apiUrl) {
    var service = {
      update: update
    };

    return service;

    function update(id, droplistItem) {
      return $http
        .put(apiUrl + 'droplistItem/' + id, droplistItem);
    }
  }
})();

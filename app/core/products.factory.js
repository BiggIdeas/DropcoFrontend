(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('productsFactory', productsFactory);

  productsFactory.$inject = ['$http', 'apiUrl'];

  /* @ngInject */
  function productsFactory($http, apiUrl) {
    var service = {
      getAll: getAll,
      create: create,
      remove: remove
    };

    return service;

    function getAll() {
      return $http
        .get(apiUrl + 'Products')
        .then(function(response) {
          return response.data;
        });
    }

    function create(product) {
      return $http
        .post(apiUrl + 'Products', product)
        .then(function(response) {
          return response.data;
        });
    }

    function remove(id) {
      return $http
        .delete(apiUrl + 'Products/' + id)
        .then(function(response) {
          return response.data;
        });
    }
  }
})();

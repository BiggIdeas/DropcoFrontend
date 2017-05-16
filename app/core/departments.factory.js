(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('departmentsFactory', departmentsFactory);

  departmentsFactory.$inject = ['$http', 'apiUrl'];

  /* @ngInject */
  function departmentsFactory($http, apiUrl) {
    var service = {
      getAll: getAll,
      create: create
    };

    return service;

    function getAll() {
      return $http
        .get(apiUrl + 'Departments')
        .then(function(response) {
          return response.data;
        });
    }

    function create(department) {
      return $http
        .post(apiUrl + 'Departments', department)
        .then(function(response) {
          return response.data;
        });
    }
  }
})();

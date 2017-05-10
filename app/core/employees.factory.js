(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('employeesFactory', employeesFactory);

    employeesFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function employeesFactory($http, apiUrl) {
        var service = {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            remove: remove
        };

        return service;

        function getAll() {
            return $http
                .get(apiUrl +'employees')
                .then(function(response) {
                    return response.data;
                });
        }

        function getById(id) {
            return $http
                .get(apiUrl + 'employees/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function update(id, driver) {
            return $http
                .put(apiUrl + 'employees/' + id, driver);
        }

        function create(driver) {
            return $http
                .post(apiUrl + 'employees', driver)
                .then(function(response) {
                    return response.data;
                });
        }

        function remove(id) {
            return $http
                .delete(apiUrl + 'employees/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
  })();

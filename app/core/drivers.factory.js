(function() {
    'use strict';

    angular
        .module('app')
        .factory('driversFactory', driversFactory);

    driversFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function driversFactory($http, apiUrl) {
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
                .get(apiUrl +'drivers')
                .then(function(response) {
                    return response.data;
                });
        }

        function getById(id) {
            return $http
                .get(apiUrl + 'drivers/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function update(id, driver) {
            return $http
                .put(apiUrl + 'drivers/' + id, driver);
        }

        function create(driver) {
            return $http
                .post(apiUrl + 'drivers', driver)
                .then(function(response) {
                    return response.data;
                });
        }

        function remove(id) {
            return $http
                .delete(apiUrl + 'drivers/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
  })();

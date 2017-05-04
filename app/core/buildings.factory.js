(function() {
    'use strict';

    angular
        .module('app')
        .factory('buildingsFactory', buildingsFactory);

    buildingsFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function buildingsFactory($http, apiUrl) {
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
                .get(apiUrl +'buildings')
                .then(function(response) {
                    return response.data;
                });
        }

        function getById(id) {
            return $http
                .get(apiUrl + 'buildings/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function update(id, building) {
            return $http
                .put(apiUrl + 'buildings/' + id, building);
        }

        function create(building) {
            return $http
                .post(apiUrl + 'buildings', building)
                .then(function(response) {
                    return response.data;
                });
        }

        function remove(id) {
            return $http
                .delete(apiUrl + 'buildings/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
  })();

(function() {
    'use strict';

    angular
        .module('app')
        .factory('stockersFactory', stockersFactory);

    stockersFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function stockersFactory($http, apiUrl) {
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
                .get(apiUrl + 'stockers')
                .then(function(response) {
                    return response.data;
                });
        }

        function getById(id) {
            return $http
                .get(apiUrl + 'stockers/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function update(id, stocker) {
            return $http
                .put(apiUrl + 'stockers/' + id, stocker);
        }

        function create(stocker) {
            return $http
                .post(apiUrl + 'stockers', stocker)
                .then(function(response) {
                    return response.data;
                });
        }

        function remove(id) {
            return $http
                .delete(apiUrl + 'stockers/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();

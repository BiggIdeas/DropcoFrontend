(function() {
    'use strict';

    angular
        .module('app')
        .factory('usersFactory', usersFactory);

    usersFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function usersFactory($http, apiUrl) {
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
                .get(apiUrl +'users')
                .then(function(response) {
                    return response.data;
                });
        }

        function getById(id) {
            return $http
                .get(apiUrl + 'users/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function update(id, user) {
            return $http
                .put(apiUrl + 'users/' + id, user);
        }

        function create(user) {
            return $http
                .post(apiUrl + 'users', user)
                .then(function(response) {
                    return response.data;
                });
        }

        function remove(id) {
            return $http
                .delete(apiUrl + 'users/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
  })();

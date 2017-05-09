(function() {
    'use strict';

    angular
        .module('app')
        .factory('droplistsFactory', droplistsFactory);

    droplistsFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function droplistsFactory($http, apiUrl) {
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
                .get(apiUrl +'droplists')
                .then(function(response) {
                    return response.data;
                });
        }

        function getById(id) {
            return $http
                .get(apiUrl + 'droplists/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function update(id, droplist) {
            return $http
                .put(apiUrl + 'droplists/' + id, droplist);
        }

        function create(droplist) {
            return $http
                .post(apiUrl + 'droplists', droplist)
                .then(function(response) {
                    return response.data;
                });
        }

        function remove(id) {
            return $http
                .delete(apiUrl + 'droplists/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
  })();

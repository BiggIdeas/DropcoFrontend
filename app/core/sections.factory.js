(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('sectionsFactory', sectionsFactory);

    sectionsFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function sectionsFactory($http, apiUrl) {
        var service = {
            getAll: getAll,
            create: create,
            remove: remove
        };

        return service;

        function getAll() {
            return $http
                .get(apiUrl + 'Sections')
                .then(function(response) {
                    return response.data;
                });
        }
        function create(section) {
          return $http
            .post(apiUrl + 'sections', section)
            .then(function(response) {
              return response.data;
            });
        }

        function remove(id) {
          return $http
            .delete(apiUrl + 'sections/' + id)
            .then(function(response) {
              return response.data;
            });
        }
    }
})();

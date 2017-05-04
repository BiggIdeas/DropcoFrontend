(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('rolesFactory', rolesFactory);

    rolesFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function rolesFactory($http, apiUrl) {

        var service = {
            getAll: getAll
        };

        return service;

        function getAll() {
            return $http
                .get(apiUrl + 'roles')
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();

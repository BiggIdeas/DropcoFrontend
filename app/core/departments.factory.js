(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('departmentsFactory', departmentsFactory);

    departmentsFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function departmentsFactory($http, apiUrl) {
        var service = {
            getAll: getAll
        };

        return service;

        function getAll() {
            return $http
                .get(apiUrl + 'Departments')
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();
